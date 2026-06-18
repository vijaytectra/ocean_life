/** URL-safe slug from title or manual input. */
export function slugifyBlog(value) {
  if (!value || typeof value !== "string") return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function normalizeBlogSlugInput(value) {
  return slugifyBlog(value);
}

export function blogPublicPath(blog) {
  if (!blog) return "/blog/";
  if (blog.slug) return `/blog/${blog.slug}/`;
  if (blog.id != null) return `/blog/${blog.id}/`;
  return "/blog/";
}
