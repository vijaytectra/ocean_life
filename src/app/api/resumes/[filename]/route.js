import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import {
  getResumeMimeType,
  findResumeFile,
} from "@/lib/careerResume";

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    const safeName = path.basename(decodeURIComponent(filename));
    const filePath = await findResumeFile(safeName);

    if (!filePath) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const buffer = await readFile(filePath);
    const mime = getResumeMimeType(safeName);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Resume download:", error);
    return new NextResponse("Error fetching resume", { status: 500 });
  }
}
