import { NextResponse } from "next/server";
import { readFile, unlink } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { getResumeAbsolutePath } from "@/lib/careerResume";

const MIME_BY_EXT = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

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

      const filePath = getResumeAbsolutePath(application.resumePath);
      const buffer = await readFile(filePath);
      const ext = path.extname(application.resumeName || application.resumePath);
      const mime = MIME_BY_EXT[ext.toLowerCase()] || "application/octet-stream";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mime,
          "Content-Disposition": `attachment; filename="${application.resumeName || "resume" + ext}"`,
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
    return NextResponse.json(application);
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

    const application = await prisma.careerApplication.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(application);
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

    try {
      await unlink(getResumeAbsolutePath(application.resumePath));
    } catch {
      // file may already be missing
    }

    await prisma.careerApplication.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
