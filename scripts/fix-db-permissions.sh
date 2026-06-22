#!/usr/bin/env bash
# Shortcut — runs the same fix as full deploy (permissions + PM2 + verify).
# Prefer: bash deploy.sh --fix-only
exec bash "$(dirname "$0")/../deploy.sh" --fix-only
