import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  isMysqlBlogEnabled,
  mysqlUpdateBlog,
  mysqlDeleteBlog,
  mysqlGetBlogById,
} from "@/lib/mysqlBlog";
import { normalizeBlogImagePath } from "@/lib/blogImage";

function mapStatus(bodyStatus) {
  if (!bodyStatus || typeof bodyStatus !== "string") return "published";
  return bodyStatus.toLowerCase() === "draft" ? "draft" : "published";
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const body = await request.json();
    const payload = {
      title: body.title,
      content: body.content,
      image: normalizeBlogImagePath(body.image),
      metaTitle: body.metaTitle ?? null,
      metaDesc: body.metaDesc ?? null,
      status: mapStatus(body.status),
    };

    if (isMysqlBlogEnabled()) {
      const existing = await mysqlGetBlogById(id);
      if (!existing) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      const blog = await mysqlUpdateBlog(id, payload);
      return NextResponse.json(blog);
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: payload,
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    if (isMysqlBlogEnabled()) {
      const existing = await mysqlGetBlogById(id);
      if (!existing) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      await mysqlDeleteBlog(id);
      return NextResponse.json({ success: true });
    }

    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
