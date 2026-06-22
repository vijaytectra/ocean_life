import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidateClientLogoPages } from "@/lib/revalidateContent";

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    await prisma.clientLogo.delete({
      where: { id },
    });
    revalidateClientLogoPages();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete logo error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
