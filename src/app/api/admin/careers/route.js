import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getResumePublicUrl } from "@/lib/careerResume";

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
        viewedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(
      applications.map((app) => ({
        ...app,
        resumeUrl: getResumePublicUrl(app.resumePath),
      }))
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
