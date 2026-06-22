import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateClientLogoPages } from "@/lib/revalidateContent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const logos = await prisma.clientLogo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(logos, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("Fetch logos error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.image || typeof body.image !== "string") {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    const logo = await prisma.clientLogo.create({
      data: {
        image: body.image,
        category: body.category || "corporate",
      },
    });
    revalidateClientLogoPages();
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Create logo error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
