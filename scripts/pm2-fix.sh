#!/usr/bin/env bash
# One-time PM2 cleanup on production. Run as root:
#   bash scripts/pm2-fix.sh
#
# Fixes: wrong process name (oceanlife), root vs oceanweb PM2 conflict, stale PM2 version.

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
APP_NAME="olipl"

echo "==> Stopping root PM2 (if any) — do NOT use root pm2 for this app"
pm2 kill 2>/dev/null || true

echo "==> Fixing PM2 for user: $APP_USER"
sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"

pm2 delete oceanlife 2>/dev/null || true
pm2 delete olipl 2>/dev/null || true
pm2 kill 2>/dev/null || true

npm ci
rm -rf .next
npm run build

pm2 start ecosystem.config.cjs
pm2 save
pm2 status
EOF

echo ""
echo "==> Done. Website should be on port 3000 as '$APP_NAME' under user $APP_USER."
echo "    Always use: sudo -u oceanweb pm2 status"
echo "    Never use:  pm2 status   (as root)"
