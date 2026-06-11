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

async function listAllBlogs() {
  try {
    if (isMysqlBlogEnabled()) {
      return (await mysqlListBlogs()).map(withNormalizedImage);
    }
    return (await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })).map(withNormalizedImage);
  } catch (error) {
    if (isMysqlBlogEnabled()) {
      return (await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      })).map(withNormalizedImage);
    }
    throw error;
  }
}

export async function listPublishedBlogs() {
  const blogs = await listAllBlogs();
  return blogs.filter((blog) => (blog.status || "published") === "published");
}

export { listAllBlogs };
