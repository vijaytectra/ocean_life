import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const DEFAULT_ADMIN_EMAIL = "salesinfra@olipl.com";
const DEFAULT_CAREER_EMAIL = "HRrecruiter@olipl.com";

/** Trim and strip surrounding quotes from .env values. */
function envVal(key) {
  const raw = process.env[key];
  if (raw == null) return "";
  return String(raw).trim().replace(/^["']|["']$/g, "");
}

/** Extract bare email from "Name <email@domain.com>" or plain address. */
export function parseMailAddress(value) {
  const raw = (value || "").trim();
  const match = raw.match(/^(.+?)\s*<([^>]+)>$/);
  return (match ? match[2] : raw).trim();
}

/** Build a valid RFC From header even when MAIL_FROM includes a display name. */
export function formatMailFrom(displayName, fromEnv) {
  const email = parseMailAddress(fromEnv);
  return `${displayName} <${email}>`;
}

function createSmtpTransport(host, port, secure, user, pass) {
  const isOffice365 =
    host.includes("office365") || host.includes("outlook");

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: port === 587 && !secure,
    auth: { user, pass },
    tls: isOffice365
      ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
      : undefined,
  });
}

export function getMailTransporter() {
  const smtpHost = envVal("SMTP_HOST");
  const smtpPort = Number(envVal("SMTP_PORT") || 587);
  const smtpSecure =
    envVal("SMTP_SECURE") === "true" || envVal("SMTP_SECURE") === "1";
  const smtpUser = envVal("SMTP_USER");
  const smtpPass = envVal("SMTP_PASS");

  const gmailUser = envVal("GMAIL_USER");
  const gmailPass = envVal("GMAIL_PASSWORD");

  // Prefer Office 365 / SMTP — do not silently fall back to Gmail if SMTP is partially set
  if (smtpHost || smtpUser || smtpPass) {
    if (!smtpHost || !smtpUser || !smtpPass) {
      const missing = [];
      if (!smtpHost) missing.push("SMTP_HOST");
      if (!smtpUser) missing.push("SMTP_USER");
      if (!smtpPass) missing.push("SMTP_PASS");
      throw new Error(
        `Incomplete SMTP config. Set all of: ${missing.join(", ")} in .env and restart PM2.`
      );
    }

    return {
      transporter: createSmtpTransport(
        smtpHost,
        smtpPort,
        smtpSecure,
        smtpUser,
        smtpPass
      ),
      fromEmail: envVal("MAIL_FROM") || smtpUser,
      provider: smtpHost,
    };
  }

  if (gmailUser && gmailPass) {
    return {
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      }),
      fromEmail: envVal("MAIL_FROM") || gmailUser,
      provider: "gmail",
    };
  }

  throw new Error(
    "Mail not configured. Add SMTP_HOST, SMTP_USER, SMTP_PASS to .env (Office 365: smtp.office365.com, port 587), remove GMAIL_* vars, then restart PM2."
  );
}

/** Where newsletter / form notifications are sent (default: salesinfra@olipl.com). */
export async function getAdminNotificationEmail() {
  const fromEnv =
    envVal("NEWSLETTER_NOTIFY_EMAIL") || envVal("ADMIN_NOTIFICATION_EMAIL");
  if (fromEnv) return fromEnv;

  try {
    const row = await prisma.siteContent.findUnique({
      where: { id: "admin-notification-email" },
    });
    if (row?.value?.trim()) return row.value.trim();
  } catch {
    // fall through to default
  }

  return DEFAULT_ADMIN_EMAIL;
}

/** Where career / job application notifications are sent (default: HRrecruiter@olipl.com). */
export async function getCareerNotificationEmail() {
  const fromEnv =
    envVal("CAREERS_NOTIFY_EMAIL") || envVal("HR_NOTIFICATION_EMAIL");
  if (fromEnv) return fromEnv;

  try {
    const row = await prisma.siteContent.findUnique({
      where: { id: "career-notification-email" },
    });
    if (row?.value?.trim()) return row.value.trim();
  } catch {
    // fall through to default
  }

  return DEFAULT_CAREER_EMAIL;
}
