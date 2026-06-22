# Production Deployment (www.olipl.com)

Server path: `/home/oceanweb/htdocs/www.olipl.com`  
Process manager: **PM2** (`olipl`, user `oceanweb`)

## Full workflow (push + pull + deploy)

### Step 1 — Local Mac (push to GitHub)

```bash
bash scripts/push.sh "Your commit message"
```

This runs: `git add` → `git commit` → `git push origin main`  
(Safe: never commits `prisma/dev.db`)

### Step 2 — Server SSH (pull + deploy)

```bash
cd /home/oceanweb/htdocs/www.olipl.com
bash deploy.sh
```

This runs: **`git pull origin main`** → permissions fix → build → PM2 restart → verify

Run as **root** or **oceanweb**. Root is recommended.

---

## Quick reference

| Where | Command | What it does |
|-------|---------|--------------|
| **Mac** | `bash scripts/push.sh "msg"` | Push code to GitHub |
| **Server** | `bash deploy.sh` | Pull + build + deploy + verify |
| **Server** | `bash deploy.sh --fix-only` | Fix DB/PM2 only (no pull/build) |

### What `deploy.sh` does automatically

1. Kills root PM2 (prevents readonly database errors)
2. Fixes file ownership (`oceanweb:oceanweb`)
3. Fixes SQLite + upload folder permissions
4. Backs up `prisma/dev.db` before schema sync
5. `git pull`, `npm ci`, `prisma db push`, `npm run build`
6. Verifies build + restarts PM2 as `oceanweb` only
7. Tests database write access + site responds on port 3000

### Quick fix (no rebuild)

If the site is up but admin can't save (readonly DB, wrong PM2 user):

```bash
cd /home/oceanweb/htdocs/www.olipl.com
bash deploy.sh --fix-only
```

---

## What lives on the server

| Component | Location |
|-----------|----------|
| Next.js app | `.next/` |
| SQLite database | `prisma/dev.db` (not in git) |
| Uploads | `public/uploads/` |
| Resumes | `private/` |
| Secrets | `.env` (not in git) |

> **`prisma/dev.db` is never committed to git.** Production data stays on the server only.

---

## First-time server setup

```bash
cd /home/oceanweb/htdocs/www.olipl.com
git clone <repo-url> .   # or git pull if already cloned
cp .env.production.example .env
nano .env                  # SMTP, SITE_URL, etc.
bash deploy.sh
node prisma/seed.js        # first setup only — creates admin user
```

Default admin (after seed): `admin` / `password123` — change immediately.

---

## Verify after deploy

```bash
sudo -u oceanweb pm2 status
sudo -u oceanweb pm2 logs olipl --lines 30
curl -I http://127.0.0.1:3000/
```

Open https://www.olipl.com/admin/login/ and test add/remove logo.

---

## Rules (do not break these)

| Do | Don't |
|----|-------|
| `bash deploy.sh` | `npm run build` as root |
| `bash deploy.sh --fix-only` | `pm2 restart olipl` as root |
| `sudo -u oceanweb pm2 logs olipl` | Commit `prisma/dev.db` to git |

---

## Email (Microsoft 365)

In server `.env`:

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

After editing `.env`:

```bash
bash deploy.sh --fix-only
```

Test from **Admin → Careers → Test careers email**.

---

## Troubleshooting

### Corporate / ongoing logos missing

The database was wiped (often by `git pull` overwriting `dev.db` or a bad deploy). Restore logos:

```bash
cd /home/oceanweb/htdocs/www.olipl.com
export DATABASE_URL="file:/home/oceanweb/htdocs/www.olipl.com/prisma/dev.db"
sudo -u oceanweb node scripts/restore-logos.js
sudo -u oceanweb pm2 restart olipl --update-env
```

Or run a full deploy (auto-restores logos if empty):

```bash
bash deploy.sh
```

Future deploys auto-restore logos from backup or re-seed from `public/clients/` + `public/logo/`.

### Blogs missing from admin / blog page

```bash
cd /home/oceanweb/htdocs/www.olipl.com
export DATABASE_URL="file:/home/oceanweb/htdocs/www.olipl.com/prisma/dev.db"
sudo -u oceanweb node scripts/restore-blogs.js
sudo -u oceanweb pm2 restart olipl --update-env
```

Or run `bash deploy.sh` (auto-restores if blog count is zero).

### `attempt to write a readonly database`

```bash
bash deploy.sh --fix-only
```

### `webpack-*.js` returns 400 (broken site)

```bash
bash deploy.sh
```

Hard-refresh browser (Cmd+Shift+R).

### Admin login hangs after deploy

Log out and log in again (cookies reset after deploy).

### Never run on production after go-live

```bash
node prisma/seed.js   # resets admin and content
```
