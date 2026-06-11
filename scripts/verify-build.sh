#!/usr/bin/env bash
# Verify production build is complete (prevents broken site / 400 on webpack chunk).
set -euo pipefail

APP_DIR="${1:-/home/oceanweb/htdocs/www.olipl.com}"
cd "$APP_DIR"

if [[ ! -d .next/static/chunks ]]; then
  echo "FAIL: .next/static/chunks missing — run npm run build"
  exit 1
fi

WEBPACK=$(ls .next/static/chunks/webpack-*.js 2>/dev/null | head -1 || true)
if [[ -z "$WEBPACK" || ! -s "$WEBPACK" ]]; then
  echo "FAIL: webpack runtime chunk missing or empty"
  exit 1
fi

if [[ ! -f .next/BUILD_ID ]]; then
  echo "FAIL: .next/BUILD_ID missing"
  exit 1
fi

echo "OK: build verified ($(basename "$WEBPACK"), BUILD_ID=$(cat .next/BUILD_ID))"
