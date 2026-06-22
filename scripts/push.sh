#!/usr/bin/env bash
# =============================================================================
# Push code to GitHub (run on your LOCAL Mac, not the server)
# =============================================================================
# Usage:
#   bash scripts/push.sh "Your commit message"
#
# Then on the server:
#   bash deploy.sh
# =============================================================================

set -euo pipefail

MSG="${1:-update}"

if [[ -f /home/oceanweb/htdocs/www.olipl.com/deploy.sh ]] && [[ "$(pwd)" == /home/oceanweb/htdocs/www.olipl.com* ]]; then
  echo "ERROR: scripts/push.sh is for your local Mac, not the production server."
  echo "On the server, run: bash deploy.sh"
  exit 1
fi

log() { echo "==> $*"; }

log "Staging changes..."
git add -A

# Never commit the live SQLite database
if git diff --cached --name-only | grep -q '^prisma/dev\.db$'; then
  log "Unstaging prisma/dev.db (server-only file)..."
  git reset HEAD prisma/dev.db 2>/dev/null || true
fi

if git diff --cached --quiet; then
  log "Nothing to commit — working tree clean."
  exit 0
fi

log "Changes to commit:"
git diff --cached --stat

log "Committing: $MSG"
git commit -m "$MSG"

log "Pushing to origin main..."
git push origin main

echo ""
log "Push complete ✓"
echo ""
echo "  Next — on the server (SSH):"
echo "    cd /home/oceanweb/htdocs/www.olipl.com"
echo "    bash deploy.sh"
echo ""
