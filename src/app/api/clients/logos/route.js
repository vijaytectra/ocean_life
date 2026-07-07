import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateClientLogoPages } from "@/lib/revalidateContent";
import { STATIC_CLIENT_LOGOS } from "@/lib/staticSiteData";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(STATIC_CLIENT_LOGOS, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
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
