import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logos = await prisma.clientLogo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(logos);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const logo = await prisma.clientLogo.create({
      data: {
        image: body.image,
        category: body.category || 'corporate',
      }
    });
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
