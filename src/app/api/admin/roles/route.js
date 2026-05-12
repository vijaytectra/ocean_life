import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const role = await prisma.role.create({
      data: { name: body.name }
    });
    return NextResponse.json(role);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
