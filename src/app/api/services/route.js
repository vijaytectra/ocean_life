import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type) {
      const services = await prisma.service.findMany({
        where: { type },
        orderBy: { id: 'asc' },
      });
      return NextResponse.json(services);
    }

    const services = await prisma.service.findMany({
      orderBy: [{ type: 'asc' }, { id: 'asc' }],
    });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
