import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isMysqlBlogEnabled, mysqlBlogCount } from "@/lib/mysqlBlog";

export async function GET() {
  try {
    let blogCount;
    if (isMysqlBlogEnabled()) {
      blogCount = await mysqlBlogCount();
    } else {
      blogCount = await prisma.blog.count();
    }
    const logoCount = await prisma.clientLogo.count();
    return NextResponse.json({ blogCount, logoCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
