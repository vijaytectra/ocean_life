#!/usr/bin/env bash
# Deploy Ocean Lifespaces Next.js app on the production server.
# Run from: /home/oceanweb/htdocs/www.olipl.com
#
# IMPORTANT — always deploy as oceanweb (not root):
#   sudo -u oceanweb bash deploy.sh
#
# If you run as root, this script re-execs as oceanweb automatically.

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
APP_NAME="olipl"

if [[ "$(id -un)" == "root" ]]; then
  echo "==> Re-running deploy as $APP_USER (never use root PM2 for this app)"
  exec sudo -u "$APP_USER" bash "$APP_DIR/deploy.sh"
fi

cd "$APP_DIR"

echo "==> Pulling latest code..."
git pull origin main

echo "==> Cleaning old build..."
rm -rf .next

echo "==> Installing dependencies..."
npm ci

echo "==> Building..."
npm run build

echo "==> Restarting PM2 process: $APP_NAME"
pm2 delete oceanlife 2>/dev/null || true
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
pm2 list

echo "==> Deploy complete. App: $APP_NAME (user: $(id -un))"
