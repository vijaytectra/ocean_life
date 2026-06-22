#!/usr/bin/env bash
# Shortcut — same as root deploy.sh (includes git pull).
exec bash "$(dirname "$0")/../deploy.sh" "$@"
