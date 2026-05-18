import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const id = decodeURIComponent((await params).id);
    const body = await request.json();
    const value = body.value ?? '';
    const type = typeof body.type === 'string' && body.type.length > 0 ? body.type : 'text';

    const content = await prisma.siteContent.upsert({
      where: { id },
      create: { id, type, value },
      update: { value, type },
    });
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = (await params).id;
    await prisma.siteContent.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
