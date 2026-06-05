#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/home/oceanweb/htdocs/www.olipl.com}"
PM2_NAME="${PM2_NAME:-olipl}"
APP_USER="${APP_USER:-oceanweb}"

cd "$APP_DIR"

echo "==> Deploying Ocean Lifespaces from $(pwd)"

if [ ! -f .env ]; then
  echo "ERROR: .env file missing. Copy .env.production.example and fill in values."
  exit 1
fi

run_as_app_user() {
  if [ "$(id -un)" = "$APP_USER" ]; then
    "$@"
  else
    sudo -u "$APP_USER" "$@"
  fi
}

echo "==> Pulling latest code..."
git fetch origin main
git merge origin/main --no-edit || git reset --hard origin/main

echo "==> Installing dependencies..."
run_as_app_user npm ci

echo "==> Backing up database..."
if [ -f prisma/dev.db ]; then
  cp prisma/dev.db "prisma/dev.db.bak.$(date +%Y%m%d-%H%M%S)"
fi

echo "==> Syncing database schema..."
run_as_app_user npx prisma generate
run_as_app_user npx prisma db push

echo "==> Building Next.js app..."
rm -rf .next
run_as_app_user npm run build

echo "==> Restarting PM2 process: $PM2_NAME (user: $APP_USER)"
if run_as_app_user pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  run_as_app_user pm2 restart "$PM2_NAME"
else
  run_as_app_user pm2 start ecosystem.config.cjs
fi

run_as_app_user pm2 save
echo "==> Deploy complete. Check: sudo -u $APP_USER pm2 logs $PM2_NAME --lines 50"
