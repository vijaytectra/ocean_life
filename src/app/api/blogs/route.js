import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  isMysqlBlogEnabled,
  mysqlListBlogs,
  mysqlCreateBlog,
} from "@/lib/mysqlBlog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (isMysqlBlogEnabled()) {
      const blogs = await mysqlListBlogs();
      return NextResponse.json(blogs, {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      });
    }
    const blogs = await prisma.$queryRaw`SELECT * FROM Blog ORDER BY createdAt DESC`;
    return new NextResponse(JSON.stringify(blogs), {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
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
    const payload = {
      title: body.title,
      content: body.content,
      image: body.image || null,
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
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
