#!/usr/bin/env bash
# Sync Prisma schema to SQLite (CareerApplication, viewedAt, etc.)
# Run on server: sudo -u oceanweb bash scripts/sync-db.sh

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"

if [[ "$(id -un)" == "root" ]]; then
  chown -R oceanweb:oceanweb "$APP_DIR"
  exec sudo -u oceanweb bash "$APP_DIR/scripts/sync-db.sh"
fi

cd "$APP_DIR"
npx prisma generate
npx prisma db push
mkdir -p public/uploads/resumes public/uploads
echo "Database synced. Restart app: pm2 restart olipl --update-env"
