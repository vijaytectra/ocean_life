import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const body = await request.json();
    if (!body?.name || typeof body.name !== 'string' || !body.name.trim()) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
    }
    if (!body?.type || typeof body.type !== 'string' || !body.type.trim()) {
      return NextResponse.json({ error: 'Category (type) is required' }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        type: body.type.trim(),
        name: body.name.trim(),
        subServices: body.subServices?.trim() || null,
        image: body.image?.trim() || null,
        description: body.description?.trim() || null,
        recentProject: body.recentProject?.trim() || null,
        ongoingProject: body.ongoingProject?.trim() || null,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt((await params).id, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Service not found (already deleted?)' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
