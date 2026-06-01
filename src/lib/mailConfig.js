import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

const DEFAULT_ADMIN_EMAIL = "salesinfra@olipl.com";

export function getMailTransporter() {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1";
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_PASSWORD?.trim();

  if (smtpHost && smtpUser && smtpPass) {
    return {
      transporter: nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      }),
      fromEmail: process.env.MAIL_FROM?.trim() || smtpUser,
    };
  }

  if (gmailUser && gmailPass) {
    return {
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      }),
      fromEmail: process.env.MAIL_FROM?.trim() || gmailUser,
    };
  }

  const missing = [];
  if (!smtpHost) missing.push("SMTP_HOST");
  if (!smtpUser) missing.push("SMTP_USER");
  if (!smtpPass) missing.push("SMTP_PASS");
  if (!gmailUser) missing.push("GMAIL_USER");
  if (!gmailPass) missing.push("GMAIL_PASSWORD");

  throw new Error(
    `Mail not configured. Add to .env: SMTP_HOST, SMTP_USER, SMTP_PASS (and restart npm run dev). Missing: ${missing.join(", ") || "credentials"}.`
  );
}

/** Where newsletter / form notifications are sent (default: salesinfra@olipl.com). */
export async function getAdminNotificationEmail() {
  const fromEnv =
    process.env.NEWSLETTER_NOTIFY_EMAIL?.trim() ||
    process.env.ADMIN_NOTIFICATION_EMAIL?.trim();
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
