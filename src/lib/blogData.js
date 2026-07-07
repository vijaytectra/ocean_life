import { STATIC_BLOGS } from "@/lib/staticSiteData";
import { normalizeBlogImagePath } from "@/lib/blogImage";

function withNormalizedImage(blog) {
  if (!blog) return blog;
  return {
    ...blog,
    image: blog.image ? normalizeBlogImagePath(blog.image) : blog.image,
  };
}

export function isBlogPublished(status) {
  return (status || "published").toLowerCase() === "published";
}

async function listAllBlogs() {
  return STATIC_BLOGS.map(withNormalizedImage);
}

export async function listPublishedBlogs() {
  const blogs = await listAllBlogs();
  return blogs.filter((blog) => isBlogPublished(blog.status));
}

export { listAllBlogs };
