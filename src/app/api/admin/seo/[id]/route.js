import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    const body = await request.json();
    const config = await prisma.seoConfig.update({
      where: { id },
      data: {
        page: body.page,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc ?? null,
        status: body.status || 'active',
      },
    });
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt((await params).id);
    await prisma.seoConfig.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
