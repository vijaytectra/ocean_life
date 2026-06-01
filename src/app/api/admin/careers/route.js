import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const applications = await prisma.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        position: true,
        experience: true,
        location: true,
        linkedin: true,
        coverLetter: true,
        resumePath: true,
        resumeName: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
