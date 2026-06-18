import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { listAllBlogs, listPublishedBlogs } from "@/lib/blogData";
import { normalizeBlogImagePath } from "@/lib/blogImage";
import { resolveBlogSlug } from "@/lib/blogSlugResolve";
import {
  isMysqlBlogEnabled,
  mysqlCreateBlog,
} from "@/lib/mysqlBlog";

export const dynamic = "force-dynamic";

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "no-store, max-age=0, must-revalidate",
  };

  try {
    const session = (await cookies()).get("admin_session");
    const blogs = session ? await listAllBlogs() : await listPublishedBlogs();
    return NextResponse.json(blogs, { headers: cacheHeaders });
  } catch (error) {
    console.error("GET /api/blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

function mapStatus(bodyStatus) {
  if (!bodyStatus || typeof bodyStatus !== "string") return "published";
  return bodyStatus.toLowerCase() === "draft" ? "draft" : "published";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const slug = await resolveBlogSlug({
      title: body.title,
      slug: body.slug,
    });
    const payload = {
      title: body.title,
      slug,
      content: body.content,
      image: normalizeBlogImagePath(body.image),
      metaTitle: body.metaTitle || null,
      metaDesc: body.metaDesc || null,
      status: mapStatus(body.status),
    };

    if (isMysqlBlogEnabled()) {
      const blog = await mysqlCreateBlog(payload);
      return NextResponse.json(blog);
    }

    const blog = await prisma.blog.create({
      data: payload,
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.error("POST /api/blogs:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
