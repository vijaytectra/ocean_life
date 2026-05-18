import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ type: 'asc' }, { id: 'asc' }],
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body?.name || typeof body.name !== 'string' || !body.name.trim()) {
      return NextResponse.json({ error: 'Service name is required' }, { status: 400 });
    }
    if (!body?.type || typeof body.type !== 'string' || !body.type.trim()) {
      return NextResponse.json({ error: 'Category (type) is required' }, { status: 400 });
    }

    const service = await prisma.service.create({
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
