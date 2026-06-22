import prisma from "@/lib/prisma";
import { isMysqlBlogEnabled, mysqlListBlogs } from "@/lib/mysqlBlog";
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
  if (isMysqlBlogEnabled()) {
    return (await mysqlListBlogs()).map(withNormalizedImage);
  }
  return (await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  })).map(withNormalizedImage);
}

export async function listPublishedBlogs() {
  const blogs = await listAllBlogs();
  return blogs.filter((blog) => isBlogPublished(blog.status));
}

export { listAllBlogs };
