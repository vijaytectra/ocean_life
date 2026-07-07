#!/usr/bin/env bash
# =============================================================================
# One-time setup: host SQLite on Turso (free tier) so git push never wipes data.
# =============================================================================
# Prerequisites:
#   1. Install Turso CLI:  curl -sSfL https://get.tur.so/install.sh | bash
#   2. Login:              turso auth login
#
# Usage (from project root on your Mac):
#   bash scripts/setup-turso.sh
#
# Then add the printed TURSO_* lines to:
#   - Server: /home/oceanweb/htdocs/www.olipl.com/.env
#   - Local:  .env  (optional, for testing remote DB)
# Never commit .env — only .env.example / .env.production.example
# =============================================================================

set -euo pipefail

DB_NAME="${TURSO_DB_NAME:-oceanipl-olipl}"
LOCAL_DB="${LOCAL_DB_PATH:-prisma/dev.db}"

log() { echo "==> $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }

command -v turso >/dev/null 2>&1 || fail "Turso CLI not found. Install: curl -sSfL https://get.tur.so/install.sh | bash"

if [[ ! -f "$LOCAL_DB" ]]; then
  fail "Local database not found: $LOCAL_DB (run npm run dev or seed first)"
fi

log "Creating Turso database '$DB_NAME' (skipped if it already exists)..."
turso db create "$DB_NAME" 2>/dev/null || log "Database '$DB_NAME' already exists — continuing"

log "Importing $LOCAL_DB into Turso database '$DB_NAME'..."
if command -v sqlite3 >/dev/null 2>&1; then
  sqlite3 "$LOCAL_DB" .dump | turso db shell "$DB_NAME"
else
  fail "sqlite3 required to import local DB. Install sqlite3 or import manually."
fi

log "Creating auth token..."
TOKEN=$(turso db tokens create "$DB_NAME")

URL=$(turso db show "$DB_NAME" --url)

log "Pushing Prisma schema to remote database..."
export TURSO_DATABASE_URL="$URL"
export TURSO_AUTH_TOKEN="$TOKEN"
DATABASE_URL=$(node -e "const { prismaCliDatabaseUrl } = require('./scripts/lib/prisma-client.cjs'); console.log(prismaCliDatabaseUrl());")
export DATABASE_URL
npx prisma db push

echo ""
echo "============================================================================="
echo "Turso database is ready. Add these to your SERVER .env file:"
echo "============================================================================="
echo ""
echo "TURSO_DATABASE_URL=\"$URL\""
echo "TURSO_AUTH_TOKEN=\"$TOKEN\""
echo ""
echo "# Optional: keep local SQLite for offline dev, or comment out DATABASE_URL"
echo "# DATABASE_URL=\"file:./prisma/dev.db\""
echo ""
echo "On the server after updating .env:"
echo "  cd /home/oceanweb/htdocs/www.olipl.com"
echo "  bash deploy.sh"
echo ""
echo "From now on: bash scripts/push.sh → bash deploy.sh — data stays on Turso."
echo "============================================================================="
