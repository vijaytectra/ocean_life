#!/usr/bin/env bash
# Test SMTP from production server.
# Run: sudo -u oceanweb bash scripts/verify-mail.sh

set -euo pipefail

APP_DIR="/home/oceanweb/htdocs/www.olipl.com"

if [[ "$(id -un)" == "root" ]]; then
  exec sudo -u oceanweb bash "$APP_DIR/scripts/verify-mail.sh"
fi

cd "$APP_DIR"

node <<'EOF'
require("dotenv").config();
const nodemailer = require("nodemailer");

function env(k) {
  const v = process.env[k];
  if (!v) return "";
  return String(v).trim().replace(/^["']|["']$/g, "");
}

const host = env("SMTP_HOST");
const port = Number(env("SMTP_PORT") || 587);
const user = env("SMTP_USER");
const pass = env("SMTP_PASS");
const gmail = env("GMAIL_USER");

console.log("SMTP_HOST:", host || "(not set)");
console.log("SMTP_USER:", user || "(not set)");
console.log("SMTP_PASS:", pass ? "(set)" : "(not set)");
console.log("GMAIL_USER:", gmail || "(not set)");

if (!host || !user || !pass) {
  console.error("\nFix .env — set Office 365 SMTP and REMOVE GMAIL_USER / GMAIL_PASSWORD:");
  console.error("  SMTP_HOST=smtp.office365.com");
  console.error("  SMTP_PORT=587");
  console.error("  SMTP_SECURE=false");
  console.error("  SMTP_USER=salesinfra@olipl.com");
  console.error("  SMTP_PASS=<mailbox-password>");
  console.error("  MAIL_FROM=salesinfra@olipl.com");
  process.exit(1);
}

const t = nodemailer.createTransport({
  host,
  port,
  secure: env("SMTP_SECURE") === "true",
  requireTLS: port === 587,
  auth: { user, pass },
  tls: { minVersion: "TLSv1.2" },
});

t.verify()
  .then(() => {
    console.log("\nSMTP OK — credentials accepted by", host);
    process.exit(0);
  })
  .catch((e) => {
    console.error("\nSMTP FAILED:", e.message);
    process.exit(1);
  });
EOF
