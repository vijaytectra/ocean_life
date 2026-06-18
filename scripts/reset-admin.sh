#!/usr/bin/env bash
# Reset admin password on production (safe — does not run full seed).
# Run: sudo bash scripts/reset-admin.sh
# Or with a custom password: sudo ADMIN_PASSWORD='YourPass' bash scripts/reset-admin.sh

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"

if [[ "$(id -un)" == "root" ]]; then
  chown -R oceanweb:oceanweb "$APP_DIR"
  exec sudo -u oceanweb env ADMIN_PASSWORD="${ADMIN_PASSWORD:-}" bash "$APP_DIR/scripts/reset-admin.sh"
fi

cd "$APP_DIR"

npx prisma generate
npx prisma db push --skip-generate 2>/dev/null || npx prisma db push

if [[ -z "${ADMIN_PASSWORD:-}" ]]; then
  ADMIN_PASSWORD="Olipl@${RANDOM}Admin"
  echo "No ADMIN_PASSWORD set — using a one-time generated password."
  echo "SAVE THIS NOW: $ADMIN_PASSWORD"
fi

export ADMIN_PASSWORD
node scripts/reset-admin-password.js

echo "Restarting app..."
pm2 restart olipl --update-env || true
