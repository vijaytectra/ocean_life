const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.olipl.com"
).replace(/\/$/, "");

const BRAND = {
  primary: "#1a365d",
  accent: "#2b6cb0",
  accentDark: "#1e4e8c",
  bg: "#f7fafc",
  border: "#e2e8f0",
  muted: "#718096",
  text: "#2d3748",
  white: "#ffffff",
  highlight: "#ebf8ff",
};

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMultiline(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function infoRow(label, value) {
  if (value === undefined || value === null || value === "") return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-size:14px;vertical-align:top;">${value}</td>
    </tr>`;
}

function ctaButton(href, label) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
      <tr>
        <td style="border-radius:8px;background:${BRAND.accent};">
          <a href="${href}" target="_blank" rel="noopener noreferrer"
             style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:${BRAND.white};text-decoration:none;border-radius:8px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

export function oliplEmailLayout({ title, preheader, bodyHtml, footerNote }) {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#edf2f7;font-family:Arial,Helvetica,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#edf2f7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(26,54,93,0.1);">
          <tr>
            <td style="background:${BRAND.primary};padding:28px 32px;text-align:center;">
              <a href="${SITE_URL}/" style="text-decoration:none;">
                <img src="${SITE_URL}/logo-web.webp" alt="Ocean Lifespaces" width="200" style="display:inline-block;max-width:200px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 0;">
              <h1 style="margin:0;font-size:24px;font-weight:700;line-height:1.35;color:${BRAND.primary};">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;color:${BRAND.text};font-size:15px;line-height:1.65;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="background:${BRAND.bg};padding:24px 32px;border-top:1px solid ${BRAND.border};text-align:center;font-size:12px;color:${BRAND.muted};line-height:1.7;">
              ${footerNote ? `<p style="margin:0 0 12px;">${footerNote}</p>` : ""}
              <p style="margin:0 0 6px;"><strong style="color:${BRAND.primary};">Ocean Lifespaces Pvt. Ltd.</strong></p>
              <p style="margin:0 0 6px;">Chennai, Tamil Nadu, India</p>
              <p style="margin:0 0 6px;">
                <a href="${SITE_URL}/" style="color:${BRAND.accent};text-decoration:none;">www.olipl.com</a>
              </p>
              <p style="margin:0;">© ${year} Ocean Lifespaces. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function careerApplicantEmail({
  fullName,
  position,
  applicationId,
  hrEmail = "HRrecruiter@olipl.com",
}) {
  const bodyHtml = `
    <p style="margin:0 0 16px;">Dear <strong>${escapeHtml(fullName)}</strong>,</p>
    <p style="margin:0 0 16px;">
      Thank you for applying to <strong>Ocean Lifespaces Pvt. Ltd.</strong>
      We have successfully received your application for the role of
      <strong>${escapeHtml(position)}</strong>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:${BRAND.highlight};border:1px solid #bee3f8;border-radius:10px;padding:20px;margin:20px 0;">
      <tr>
        <td>
          <p style="margin:0 0 8px;font-size:13px;color:${BRAND.accentDark};font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">What happens next</p>
          <p style="margin:0;color:${BRAND.text};font-size:14px;line-height:1.6;">
            Our HR team will review your profile and qualifications. If your experience aligns with our requirements,
            we will contact you for the next steps in the hiring process.
          </p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:${BRAND.bg};border-radius:10px;padding:16px 20px;margin:16px 0;">
      <tr>
        <td style="font-size:13px;color:${BRAND.muted};">Application reference</td>
      </tr>
      <tr>
        <td style="font-size:20px;font-weight:700;color:${BRAND.primary};padding-top:4px;">#${escapeHtml(applicationId)}</td>
      </tr>
    </table>
    <p style="margin:16px 0 0;color:${BRAND.muted};font-size:14px;">
      If you have any questions, reach us at
      <a href="mailto:${hrEmail}" style="color:${BRAND.accent};text-decoration:none;">${escapeHtml(hrEmail)}</a>.
    </p>`;

  return oliplEmailLayout({
    title: "Application Received",
    preheader: `Your application for ${position} at Ocean Lifespaces has been received.`,
    bodyHtml,
    footerNote:
      "Please do not reply to this automated message. For career enquiries, contact our HR team.",
  });
}

export function careerHrNotificationEmail({
  fullName,
  email,
  phone,
  position,
  experience,
  location,
  linkedin,
  coverLetter,
  resumeName,
  resumeUrl,
  applicationId,
  adminUrl,
}) {
  const resumeHref = resumeUrl.startsWith("http")
    ? resumeUrl
    : `${SITE_URL}${resumeUrl}`;
  const atsHref = adminUrl || `${SITE_URL}/admin/careers/`;

  const bodyHtml = `
    <p style="margin:0 0 16px;">
      A new career application has been submitted on <strong>www.olipl.com</strong>.
      Review the candidate details below.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:10px;padding:8px 20px;margin:16px 0;">
      ${infoRow("Application ID", `<strong>#${escapeHtml(applicationId)}</strong>`)}
      ${infoRow("Name", escapeHtml(fullName))}
      ${infoRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color:${BRAND.accent};text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${infoRow("Phone", escapeHtml(phone))}
      ${infoRow("Position", escapeHtml(position))}
      ${infoRow("Experience", escapeHtml(experience || "—"))}
      ${infoRow("City", escapeHtml(location || "—"))}
      ${infoRow(
        "LinkedIn",
        linkedin
          ? `<a href="${escapeHtml(linkedin)}" style="color:${BRAND.accent};text-decoration:none;" target="_blank" rel="noopener noreferrer">View profile</a>`
          : "—"
      )}
      ${infoRow("Resume", escapeHtml(resumeName))}
    </table>
    ${ctaButton(resumeHref, "Download Resume")}
    ${ctaButton(atsHref, "Open in Admin ATS")}
    ${
      coverLetter
        ? `
    <p style="margin:24px 0 8px;font-size:13px;color:${BRAND.muted};font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">Cover letter</p>
    <div style="background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:10px;padding:16px 20px;color:${BRAND.text};font-size:14px;line-height:1.6;">
      ${formatMultiline(coverLetter)}
    </div>`
        : ""
    }
    <p style="margin:24px 0 0;color:${BRAND.muted};font-size:13px;">
      Submitted on ${escapeHtml(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))} (IST)
    </p>`;

  return oliplEmailLayout({
    title: "New Career Application",
    preheader: `${fullName} applied for ${position}. Application #${applicationId}.`,
    bodyHtml,
    footerNote: "This notification was sent automatically from the Ocean Lifespaces careers form.",
  });
}
