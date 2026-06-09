#!/usr/bin/env bash
# Run on production server: bash scripts/production-update.sh
set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
PM2_NAME="olipl"

cd "$APP_DIR"

run_app() {
  if [ "$(id -un)" = "$APP_USER" ]; then
    "$@"
  else
    sudo -u "$APP_USER" "$@"
  fi
}

echo "=== BEFORE ==="
git log -1 --oneline
echo ""

echo "=== 1. Sync code from GitHub ==="
git fetch origin main
git reset --hard origin/main
echo "Now at: $(git log -1 --oneline)"
echo ""

echo "=== 2. Install & build ==="
rm -rf .next
run_app npm ci
run_app npx prisma generate
run_app npm run build
echo ""

echo "=== 3. Verify admin CSS in build ==="
if grep -rq "100svh" .next/static/css/ 2>/dev/null; then
  echo "OK: New admin sidebar styles found in build."
else
  echo "WARNING: Could not verify new admin CSS — check build output."
fi
echo ""

echo "=== 4. Restart PM2 ==="
if run_app pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  run_app pm2 restart "$PM2_NAME"
else
  run_app pm2 start ecosystem.config.cjs
fi
run_app pm2 save
run_app pm2 status
echo ""
echo "=== DONE ==="
echo "Open https://www.olipl.com/admin/login/ and hard-refresh (Cmd+Shift+R)"
