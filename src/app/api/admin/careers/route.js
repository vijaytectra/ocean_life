import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getResumePublicUrl } from "@/lib/careerResume";

function mapApplications(applications) {
  return applications.map((app) => ({
    ...app,
    resumeUrl: getResumePublicUrl(app.resumePath),
  }));
}

export async function GET() {
  try {
    const applications = await prisma.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(mapApplications(applications));
  } catch (error) {
    console.error("Admin careers list:", error);
    const message = error?.message || "Failed to load applications";

    if (
      message.includes("no such table") ||
      message.includes("CareerApplication") ||
      message.includes("viewedAt") ||
      message.includes("does not exist")
    ) {
      return NextResponse.json(
        {
          error:
            "Careers database is not set up on the server. Run: npx prisma db push (as oceanweb user), then restart PM2.",
          details: message,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
