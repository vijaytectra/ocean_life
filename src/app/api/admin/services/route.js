import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const service = await prisma.service.create({
      data: {
        type: body.type,
        name: body.name,
        subServices: body.subServices,
        image: body.image,
        description: body.description,
        recentProject: body.recentProject,
        ongoingProject: body.ongoingProject
      }
    });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
