#!/usr/bin/env bash
# =============================================================================
# Ocean Lifespaces — ONE-COMMAND production deploy (SERVER ONLY)
# =============================================================================
# Step 1 — on your Mac (push code):
#   bash scripts/push.sh "Your commit message"
#
# Step 2 — on the server (pull + deploy):
#   cd /home/oceanweb/htdocs/www.olipl.com
#   bash deploy.sh
#
# deploy.sh automatically runs: git pull origin main
# Then: permissions, SQLite, PM2, npm ci, prisma db push, build, restart, verify
#
# Options:
#   bash deploy.sh              Full deploy (pull + build + restart)
#   bash deploy.sh --fix-only   Fix permissions + PM2 only (no pull/build)
# =============================================================================

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
APP_NAME="olipl"
DB_PATH="$APP_DIR/prisma/dev.db"
PORT=3000
FIX_ONLY=false

for arg in "$@"; do
  case "$arg" in
    --fix-only|--fix) FIX_ONLY=true ;;
    --help|-h)
      echo "Usage: bash deploy.sh [--fix-only]"
      echo ""
      echo "  Full deploy (default): git pull + build + restart + verify"
      echo "  --fix-only:            permissions + PM2 only"
      echo ""
      echo "Push code first (on Mac): bash scripts/push.sh \"message\""
      exit 0
      ;;
  esac
done

log() { echo "==> $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Root-only: kill wrong PM2, fix ownership, SQLite permissions
# ---------------------------------------------------------------------------
fix_permissions() {
  log "Killing root PM2 (olipl must never run as root)..."
  pm2 kill 2>/dev/null || true

  log "Stopping app before permission fix..."
  sudo -u "$APP_USER" pm2 stop "$APP_NAME" 2>/dev/null || true

  log "Setting ownership to $APP_USER..."
  chown -R "$APP_USER:$APP_USER" "$APP_DIR"

  log "Fixing prisma + SQLite permissions..."
  mkdir -p "$APP_DIR/prisma"
  chmod 775 "$APP_DIR/prisma"
  if [[ -f "$DB_PATH" ]]; then
    chmod 664 "$DB_PATH"
    chown "$APP_USER:$APP_USER" "$DB_PATH"
  fi
  shopt -s nullglob
  for f in "$APP_DIR/prisma/dev.db"-* "$APP_DIR/prisma/"*.db-journal; do
    chmod 664 "$f"
    chown "$APP_USER:$APP_USER" "$f"
  done
  shopt -u nullglob

  log "Fixing upload directories..."
  mkdir -p "$APP_DIR/public/uploads/resumes" "$APP_DIR/private"
  chmod -R u+rwX "$APP_DIR/public/uploads" "$APP_DIR/private" 2>/dev/null || true
  chown -R "$APP_USER:$APP_USER" "$APP_DIR/public/uploads" "$APP_DIR/private" 2>/dev/null || true
}

verify_database_writable() {
  log "Verifying SQLite is writable by $APP_USER..."
  sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
export DATABASE_URL="file:$DB_PATH"
test -w prisma || { echo "prisma/ not writable"; exit 1; }
if [[ -f prisma/dev.db ]]; then
  test -w prisma/dev.db || { echo "prisma/dev.db not writable"; exit 1; }
fi
touch prisma/.write-test && rm -f prisma/.write-test
if command -v sqlite3 >/dev/null 2>&1 && [[ -f prisma/dev.db ]]; then
  sqlite3 prisma/dev.db "CREATE TABLE IF NOT EXISTS _write_probe (id INTEGER); INSERT INTO _write_probe VALUES (1); DELETE FROM _write_probe WHERE id=1;"
fi
echo "OK: database writable"
EOF
}

backup_database() {
  if [[ -f "$DB_PATH" ]]; then
    local backup="$APP_DIR/prisma/dev.db.bak-$(date +%Y%m%d-%H%M%S)"
    log "Backing up database to $(basename "$backup")..."
    cp -a "$DB_PATH" "$backup"
    chown "$APP_USER:$APP_USER" "$backup" 2>/dev/null || true
    # Keep last 5 backups
    ls -1t "$APP_DIR"/prisma/dev.db.bak-* 2>/dev/null | tail -n +6 | xargs -r rm -f
  fi
}

db_count() {
  local table="$1"
  if [[ ! -f "$DB_PATH" ]]; then
    echo 0
    return
  fi
  if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM ${table};" 2>/dev/null || echo 0
  else
    echo 0
  fi
}

protect_database_for_pull() {
  PREDEPLOY_DB=""
  if [[ -f "$DB_PATH" ]]; then
    PREDEPLOY_DB=$(mktemp)
    cp -a "$DB_PATH" "$PREDEPLOY_DB"
    log "Saved pre-pull database snapshot."
  fi
}

restore_database_if_wiped() {
  local logo_count pre_logos bak bak_logos

  logo_count=$(db_count "ClientLogo")
  if [[ "${logo_count:-0}" -gt 0 ]]; then
    [[ -n "${PREDEPLOY_DB:-}" ]] && rm -f "$PREDEPLOY_DB"
    return
  fi

  log "WARN: ClientLogo table is empty."

  if [[ -n "${PREDEPLOY_DB:-}" && -f "$PREDEPLOY_DB" ]]; then
    pre_logos=$(sqlite3 "$PREDEPLOY_DB" "SELECT COUNT(*) FROM ClientLogo;" 2>/dev/null || echo 0)
    if [[ "${pre_logos:-0}" -gt 0 ]]; then
      log "Restoring database from pre-pull snapshot (${pre_logos} logos)..."
      cp -a "$PREDEPLOY_DB" "$DB_PATH"
      rm -f "$PREDEPLOY_DB"
      export DATABASE_URL="file:$DB_PATH"
      npx prisma db push
      return
    fi
    rm -f "$PREDEPLOY_DB"
  fi

  local latest
  latest=$(ls -1t "$APP_DIR"/prisma/dev.db.bak-* 2>/dev/null | head -1 || true)
  if [[ -n "$latest" ]]; then
    bak_logos=$(sqlite3 "$latest" "SELECT COUNT(*) FROM ClientLogo;" 2>/dev/null || echo 0)
    if [[ "${bak_logos:-0}" -gt 0 ]]; then
      log "Restoring database from backup $(basename "$latest") (${bak_logos} logos)..."
      cp -a "$latest" "$DB_PATH"
      export DATABASE_URL="file:$DB_PATH"
      npx prisma db push
      return
    fi
  fi

  log "Seeding logos from public/clients + public/logo..."
  export DATABASE_URL="file:$DB_PATH"
  node scripts/restore-logos.js
  node scripts/restore-blogs.js
  node scripts/restore-employees.js
  node scripts/restore-accreditations.js
}

# ---------------------------------------------------------------------------
# App deploy (always runs as oceanweb)
# ---------------------------------------------------------------------------
deploy_app() {
  cd "$APP_DIR"

  if [[ "$FIX_ONLY" == "false" ]]; then
    protect_database_for_pull

    log "Pulling latest code..."
    if ! git pull origin main; then
      log "WARN: git pull failed — stashing local changes and retrying..."
      git stash push -u -m "deploy-stash-$(date +%Y%m%d-%H%M%S)" || true
      git pull origin main
    fi

    # Never let git replace the live database
    if git ls-files --error-unmatch prisma/dev.db >/dev/null 2>&1; then
      log "WARN: prisma/dev.db is tracked in git — untracking on server..."
      git update-index --assume-unchanged prisma/dev.db 2>/dev/null || true
    fi

    backup_database

    log "Cleaning old build..."
    rm -rf .next

    log "Installing dependencies..."
    npm ci

    log "Syncing database schema..."
    export DATABASE_URL="file:$DB_PATH"
    npx prisma db push
    npx prisma generate

    log "Syncing homepage stats (employees count, hero copy)..."
    node scripts/update-home-stats.js

    restore_database_if_wiped

    log "Ensuring upload directories..."
    mkdir -p public/uploads/resumes public/uploads private
    chmod -R u+rwX public/uploads private 2>/dev/null || true

    log "Building Next.js..."
    npm run build

    log "Verifying build..."
    bash scripts/verify-build.sh "$APP_DIR"
  fi

  log "Restarting PM2 ($APP_NAME)..."
  pm2 delete oceanlife 2>/dev/null || true
  if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 restart "$APP_NAME" --update-env
  else
    pm2 start ecosystem.config.cjs
  fi
  pm2 save
}

verify_deployment() {
  log "Verifying deployment..."

  # PM2 must run as oceanweb
  local pm2_user
  pm2_user=$(sudo -u "$APP_USER" pm2 jlist 2>/dev/null | grep -o '"username":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "")
  if [[ -n "$pm2_user" && "$pm2_user" != "$APP_USER" ]]; then
    fail "PM2 is running as '$pm2_user', expected '$APP_USER'. Run: bash deploy.sh --fix-only"
  fi

  local pid
  pid=$(sudo -u "$APP_USER" pm2 pid "$APP_NAME" 2>/dev/null || echo "")
  if [[ -z "$pid" ]]; then
    fail "PM2 process '$APP_NAME' is not running"
  fi

  local proc_user
  proc_user=$(ps -o user= -p "$pid" 2>/dev/null | tr -d ' ' || echo "")
  if [[ "$proc_user" != "$APP_USER" ]]; then
    fail "Process $pid runs as '$proc_user', expected '$APP_USER'. Run: bash deploy.sh --fix-only"
  fi

  verify_database_writable

  local logo_count
  logo_count=$(db_count "ClientLogo")
  if [[ "${logo_count:-0}" -eq 0 ]]; then
    log "No client logos in database — restoring..."
    sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
export DATABASE_URL="file:$DB_PATH"
node scripts/restore-logos.js
EOF
  fi

  local blog_count
  blog_count=$(db_count "Blog")
  if [[ "${blog_count:-0}" -eq 0 ]]; then
    log "No blogs in database — restoring..."
    sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
export DATABASE_URL="file:$DB_PATH"
node scripts/restore-blogs.js
EOF
  fi

  local employee_count
  employee_count=$(db_count "Employee")
  if [[ "${employee_count:-0}" -eq 0 ]]; then
    log "No employees in database — restoring..."
    sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
export DATABASE_URL="file:$DB_PATH"
node scripts/restore-employees.js
EOF
  fi

  local accreditation_count
  accreditation_count=$(db_count "Accreditation")
  if [[ "${accreditation_count:-0}" -eq 0 ]]; then
    log "No accreditations in database — restoring..."
    sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
export DATABASE_URL="file:$DB_PATH"
node scripts/restore-accreditations.js
EOF
  fi

  log "Waiting for app on port $PORT..."
  local i
  for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf -o /dev/null "http://127.0.0.1:$PORT/"; then
      log "Site responding on http://127.0.0.1:$PORT/"
      break
    fi
    sleep 2
    if [[ "$i" -eq 10 ]]; then
      fail "Site not responding on port $PORT. Check: sudo -u oceanweb pm2 logs $APP_NAME --lines 40"
    fi
  done

  if curl -sf "http://127.0.0.1:$PORT/api/test-db/" >/dev/null 2>&1; then
    log "API /api/test-db/ OK"
  else
    log "WARN: /api/test-db/ check failed (non-fatal)"
  fi

  sudo -u "$APP_USER" pm2 status
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
main() {
  if [[ ! -d "$APP_DIR" ]]; then
    fail "App directory not found: $APP_DIR"
  fi

  log "Ocean Lifespaces deploy — $(date '+%Y-%m-%d %H:%M:%S')"
  log "Mode: $(if $FIX_ONLY; then echo 'fix-only'; else echo 'full deploy'; fi)"
  log "Invoker: $(id -un)"

  if [[ "$(id -un)" == "root" ]]; then
    fix_permissions
    sudo -u "$APP_USER" bash "$APP_DIR/deploy.sh" $(if $FIX_ONLY; then echo --fix-only; fi)
    fix_permissions
    verify_deployment
  else
    if [[ "$(id -un)" != "$APP_USER" ]]; then
      fail "Run as root or $APP_USER. On server: bash deploy.sh"
    fi
    deploy_app
    if [[ "$FIX_ONLY" == "true" ]]; then
      log "Fix-only complete. Run 'bash deploy.sh' as root for full verification."
    fi
  fi

  echo ""
  log "Deploy complete ✓"
  echo "    App:     $APP_NAME"
  echo "    User:    $APP_USER"
  echo "    URL:     https://www.olipl.com"
  echo "    Admin:   https://www.olipl.com/admin/login/"
  echo "    Logs:    sudo -u oceanweb pm2 logs $APP_NAME --lines 50"
  echo ""
  echo "    Do NOT run pm2/npm as root. Always use: bash deploy.sh"
}

main "$@"
