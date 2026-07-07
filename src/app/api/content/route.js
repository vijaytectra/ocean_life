import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { STATIC_SITE_CONTENT } from '@/lib/staticSiteData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(STATIC_SITE_CONTENT);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const content = await prisma.siteContent.create({
      data: {
        id: body.id,
        type: body.type,
        value: body.value,
      }
    });
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 });
  }
}
