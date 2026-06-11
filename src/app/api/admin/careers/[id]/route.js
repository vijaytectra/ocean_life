import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import {
  findResumeFile,
  deleteResumeFile,
  getResumePublicUrl,
  getResumeMimeType,
} from "@/lib/careerResume";

export async function GET(request, { params }) {
  const { id } = await params;
  const url = new URL(request.url);

  if (url.searchParams.get("download") === "resume") {
    try {
      const application = await prisma.careerApplication.findUnique({
        where: { id: Number(id) },
      });
      if (!application) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      const filePath = await findResumeFile(application.resumePath);
      if (!filePath) {
        return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
      }

      const buffer = await readFile(filePath);
      const ext = path.extname(application.resumePath);
      const mime = getResumeMimeType(application.resumePath);
      const downloadName = application.resumeName || `resume${ext}`;

      if (!application.viewedAt) {
        await prisma.careerApplication.update({
          where: { id: Number(id) },
          data: { viewedAt: new Date() },
        });
      }

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mime,
          "Content-Disposition": `attachment; filename="${downloadName}"`,
        },
      });
    } catch (error) {
      console.error("Resume download:", error);
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
    }
  }

  try {
    const application = await prisma.careerApplication.findUnique({
      where: { id: Number(id) },
    });
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...application,
      resumeUrl: getResumePublicUrl(application.resumePath),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const data = {};
    if (body.status) data.status = body.status;
    if (body.notes !== undefined) data.notes = body.notes;
    if (body.markViewed) data.viewedAt = new Date();

    const application = await prisma.careerApplication.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json({
      ...application,
      resumeUrl: getResumePublicUrl(application.resumePath),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const application = await prisma.careerApplication.findUnique({
      where: { id: Number(id) },
    });
    if (!application) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteResumeFile(application.resumePath);

    await prisma.careerApplication.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
