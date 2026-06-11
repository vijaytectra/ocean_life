import prisma from "@/lib/prisma";
import { isMysqlBlogEnabled, mysqlListBlogs } from "@/lib/mysqlBlog";

async function listAllBlogs() {
  try {
    if (isMysqlBlogEnabled()) {
      return mysqlListBlogs();
    }
    return prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (isMysqlBlogEnabled()) {
      return prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
    throw error;
  }
}

export async function listPublishedBlogs() {
  const blogs = await listAllBlogs();
  return blogs.filter((blog) => (blog.status || "published") === "published");
}

export { listAllBlogs };
