/** Cookie options for admin session — only use Secure on HTTPS (not plain HTTP production). */
export function getAdminCookieOptions() {
  const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const forceSecure = process.env.COOKIE_SECURE === "true";
  const forceInsecure = process.env.COOKIE_SECURE === "false";
  const secure =
    !forceInsecure && (forceSecure || (process.env.NODE_ENV === "production" && siteUrl.startsWith("https://")));

  return {
    httpOnly: true,
    secure,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  };
}

export function clearAdminCookies(response) {
  const options = { path: "/" };
  response.cookies.set("admin_session", "", { ...options, maxAge: 0 });
  response.cookies.set("user_id", "", { ...options, maxAge: 0 });
}
