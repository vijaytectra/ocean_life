#!/usr/bin/env bash
# Shortcut — full rebuild + permission fix.
# Prefer: bash deploy.sh
exec bash "$(dirname "$0")/../deploy.sh"
