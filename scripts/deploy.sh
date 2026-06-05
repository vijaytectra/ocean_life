#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/home/oceanweb/htdocs/www.olipl.com}"
PM2_NAME="${PM2_NAME:-olipl}"

cd "$APP_DIR"

echo "==> Deploying Ocean Lifespaces from $(pwd)"

if [ ! -f .env ]; then
  echo "ERROR: .env file missing. Copy .env.production.example and fill in values."
  exit 1
fi

echo "==> Pulling latest code..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Backing up database..."
if [ -f prisma/dev.db ]; then
  cp prisma/dev.db "prisma/dev.db.bak.$(date +%Y%m%d-%H%M%S)"
fi

echo "==> Syncing database schema..."
npx prisma generate
npx prisma db push

echo "==> Building Next.js app..."
npm run build

echo "==> Restarting PM2 process: $PM2_NAME"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME"
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
echo "==> Deploy complete. Check: pm2 logs $PM2_NAME --lines 50"
