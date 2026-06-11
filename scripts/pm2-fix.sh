#!/usr/bin/env bash
# One-time PM2 + dependencies fix on production. Run as root:
#   cd /home/oceanweb/htdocs/www.olipl.com
#   git pull origin main
#   bash scripts/pm2-fix.sh

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
APP_NAME="olipl"

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR"
  exit 1
fi

echo "==> Stopping root PM2 (if any)"
pm2 kill 2>/dev/null || true

echo "==> Fixing file ownership (root npm installs break oceanweb PM2)"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo "==> Reinstalling dependencies and rebuilding as $APP_USER"
sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"

pm2 delete oceanlife 2>/dev/null || true
pm2 delete olipl 2>/dev/null || true
pm2 kill 2>/dev/null || true

echo "==> Clean install node_modules..."
rm -rf node_modules .next
npm ci

if [[ ! -f node_modules/next/dist/bin/next ]]; then
  echo "ERROR: Next.js not installed after npm ci. Check npm errors above."
  exit 1
fi

echo "==> Building..."
npm run build
bash scripts/verify-build.sh "$APP_DIR"

if [[ ! -d .next ]]; then
  echo "ERROR: Build failed — .next folder missing."
  exit 1
fi

echo "==> Starting PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 status

sleep 2
if curl -sf -o /dev/null http://127.0.0.1:3000/; then
  echo "==> Site responding on port 3000"
else
  echo "WARN: Port 3000 not responding yet — check: pm2 logs olipl --lines 30"
fi
EOF

echo ""
echo "==> Done. Use only: sudo -u oceanweb pm2 status"
