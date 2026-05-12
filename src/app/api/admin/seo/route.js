import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const configs = await prisma.seoConfig.findMany({
      orderBy: { page: 'asc' }
    });
    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const config = await prisma.seoConfig.upsert({
      where: { page: body.page },
      update: {
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        status: body.status || 'active'
      },
      create: {
        page: body.page,
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
        status: body.status || 'active'
      }
    });
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
