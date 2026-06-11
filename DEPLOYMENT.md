# Production Deployment (www.olipl.com)

Server path: `/home/oceanweb/htdocs/www.olipl.com`  
Process manager: **PM2** (`olipl`)

## What gets deployed

| Component | Location |
|-----------|----------|
| Next.js frontend + API routes | Built into `.next/` |
| SQLite database (CMS data) | `prisma/dev.db` |
| Uploaded images/videos | `public/uploads/` |
| Career resumes | `private/` |
| Environment secrets | `.env` (not in git) |

## First-time server setup

```bash
cd /home/oceanweb/htdocs/www.olipl.com
git pull origin main
cp .env.production.example .env
# Edit .env with real SMTP and DATABASE_URL values
nano .env

npm ci
npx prisma generate
npx prisma db push
node prisma/seed.js   # only on first setup
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

> **Important:** PM2 runs under the `oceanweb` user. Never run `pm2 restart olipl` as root — use `sudo -u oceanweb pm2 restart olipl`.

If `pm2 status` as root shows `oceanlife` errored but `olipl` looked online a moment ago, you have **two PM2 daemons** (root vs oceanweb). Fix once:

```bash
cd /home/oceanweb/htdocs/www.olipl.com
chmod +x scripts/pm2-fix.sh
bash scripts/pm2-fix.sh
```

After that, only check status as oceanweb:

```bash
sudo -u oceanweb pm2 status
```

## Regular deploy (after pushing code to GitHub)

On your **local machine**:

```bash
git add .
git commit -m "Your message"
git push origin main
```

On the **server** (SSH as root or oceanweb):

```bash
cd /home/oceanweb/htdocs/www.olipl.com
sudo -u oceanweb bash deploy.sh
```

> **Important:** PM2 runs under the `oceanweb` user. Never run `pm2 restart olipl` as root — use `sudo -u oceanweb pm2 restart olipl`.

Or manually:

```bash
cd /home/oceanweb/htdocs/www.olipl.com
git fetch origin main
git merge origin/main --no-edit || git reset --hard origin/main
rm -rf .next
sudo -u oceanweb npm ci
sudo -u oceanweb npx prisma generate
sudo -u oceanweb npm run build
sudo -u oceanweb pm2 restart olipl || sudo -u oceanweb pm2 start ecosystem.config.cjs
sudo -u oceanweb pm2 save
```

## Verify after deploy

```bash
sudo -u oceanweb pm2 status
sudo -u oceanweb pm2 logs olipl --lines 50
curl -I http://127.0.0.1:3000/
```

### Build error: `EACCES permission denied` on `.next`

This means **`npm run build` was run as root** but the app runs as `oceanweb`. Fix:

```bash
chown -R oceanweb:oceanweb /home/oceanweb/htdocs/www.olipl.com
sudo -u oceanweb bash -c 'cd /home/oceanweb/htdocs/www.olipl.com && rm -rf .next && npm run build'
sudo -u oceanweb pm2 restart olipl --update-env
```

Never run `npm run build` or `npm ci` as root in the app folder.

### Broken site: `webpack-*.js` returns 400

HTML references a webpack chunk that is **missing or corrupt** in `.next` (usually after a failed build). Other `/_next/static/chunks/*.js` files may still return 200.

```bash
chown -R oceanweb:oceanweb /home/oceanweb/htdocs/www.olipl.com
sudo -u oceanweb bash -c 'cd /home/oceanweb/htdocs/www.olipl.com && rm -rf .next && npm run build && bash scripts/verify-build.sh'
sudo -u oceanweb pm2 restart olipl --update-env
```

Then hard-refresh the browser (Cmd+Shift+R) or clear CDN cache.

Then open https://www.olipl.com/admin/login/ and log in again.

## Email (Microsoft 365 / Office 365)

Add to `.env` on the server:

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=salesinfra@olipl.com
SMTP_PASS=your-mailbox-password
MAIL_FROM=salesinfra@olipl.com
CAREERS_NOTIFY_EMAIL=HRrecruiter@olipl.com
NEXT_PUBLIC_SITE_URL=https://www.olipl.com
```

- **Port 587** + `SMTP_SECURE=false` = STARTTLS (correct for Office 365).
- **Send from:** `salesinfra@olipl.com` (SMTP login + From address).
- **Careers notify:** `HRrecruiter@olipl.com` receives application alerts.
- **Contact/newsletter notify:** `salesinfra@olipl.com` (default admin notification email).

After updating `.env`:

```bash
sudo -u oceanweb pm2 restart olipl --update-env
```

Test from **Admin → Careers (ATS) → Test careers email**.

## Important notes

- **Never** run `prisma/seed.js` on production after go-live (it resets admin/content).
- `prisma/dev.db` and `public/uploads/` are preserved by `deploy.sh` (db is backed up before schema sync).
- Admin auth requires both cookies: `admin_session` + `user_id`. Log out and log in after deploy if admin hangs on loading.
- Nginx should proxy `www.olipl.com` → `http://127.0.0.1:3000`.
