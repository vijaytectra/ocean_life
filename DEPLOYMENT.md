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
chmod +x scripts/deploy.sh
./scripts/deploy.sh
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
pm2 status
pm2 logs olipl --lines 50
curl -I http://127.0.0.1:3000/admin/login/
curl http://127.0.0.1:3000/api/test-db/
```

Then open https://www.olipl.com/admin/login/ and log in again.

## Important notes

- **Never** run `prisma/seed.js` on production after go-live (it resets admin/content).
- `prisma/dev.db` and `public/uploads/` are preserved by `deploy.sh` (db is backed up before schema sync).
- Admin auth requires both cookies: `admin_session` + `user_id`. Log out and log in after deploy if admin hangs on loading.
- Nginx should proxy `www.olipl.com` → `http://127.0.0.1:3000`.
