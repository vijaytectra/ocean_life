const DEFAULT_BLOG_IMAGE = "/blog-images/top5.webp";

/** Map stored image path to a working public URL (handles legacy `/blogs/` prefix). */
export function resolveBlogImageUrl(url) {
  if (typeof url !== "string") return DEFAULT_BLOG_IMAGE;
  const trimmed = url.trim();
  if (!trimmed) return DEFAULT_BLOG_IMAGE;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  if (trimmed.startsWith("/blogs/")) {
    return trimmed.replace(/^\/blogs\//, "/blog-images/");
  }
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}

/** Normalize image path before saving to the database. */
export function normalizeBlogImagePath(url) {
  if (typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("/blogs/")) return trimmed.replace(/^\/blogs\//, "/blog-images/");
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}
