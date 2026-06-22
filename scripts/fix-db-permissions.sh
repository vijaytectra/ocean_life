#!/usr/bin/env bash
# Fix SQLite "attempt to write a readonly database" on production.
# Run as root on the server:
#   cd /home/oceanweb/htdocs/www.olipl.com
#   bash scripts/fix-db-permissions.sh

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"
APP_USER="oceanweb"
APP_NAME="olipl"

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory not found: $APP_DIR"
  exit 1
fi

if [[ "$(id -un)" != "root" ]]; then
  echo "Run as root: sudo bash scripts/fix-db-permissions.sh"
  exit 1
fi

echo "==> Stopping app (oceanweb PM2)..."
sudo -u "$APP_USER" pm2 stop "$APP_NAME" 2>/dev/null || true

echo "==> Stopping root PM2 (wrong user — causes readonly DB errors)..."
pm2 kill 2>/dev/null || true

echo "==> Fixing ownership (prisma DB, uploads, app files)..."
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo "==> Fixing permissions..."
chmod 775 "$APP_DIR/prisma"
if [[ -f "$APP_DIR/prisma/dev.db" ]]; then
  chmod 664 "$APP_DIR/prisma/dev.db"
fi
for f in "$APP_DIR/prisma/dev.db"-*; do
  [[ -e "$f" ]] && chmod 664 "$f" && chown "$APP_USER:$APP_USER" "$f"
done
chmod -R u+rwX "$APP_DIR/public/uploads" 2>/dev/null || mkdir -p "$APP_DIR/public/uploads/resumes"
chown -R "$APP_USER:$APP_USER" "$APP_DIR/public/uploads"

echo "==> Verify database is writable by $APP_USER..."
sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
test -w prisma/dev.db || { echo "ERROR: prisma/dev.db still not writable"; exit 1; }
test -w prisma || { echo "ERROR: prisma/ directory still not writable"; exit 1; }
touch prisma/.write-test && rm -f prisma/.write-test
echo "OK: $APP_USER can write to prisma/"
EOF

echo "==> Restarting PM2 as $APP_USER..."
sudo -u "$APP_USER" bash <<EOF
set -euo pipefail
cd "$APP_DIR"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save
pm2 status
EOF

echo ""
echo "==> Done. Always use: sudo -u oceanweb pm2 restart olipl"
echo "    Never run pm2 as root for this app."
