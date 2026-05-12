import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await mammoth.convertToHtml({ buffer });

    return NextResponse.json({ 
      html: result.value,
      warnings: result.messages 
    });
  } catch (error) {
    console.error("DOCX Parse error:", error);
    return NextResponse.json({ error: "Failed to parse document" }, { status: 500 });
  }
}
