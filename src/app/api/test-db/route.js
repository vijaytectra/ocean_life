import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const blogCount = await prisma.blog.count();
    const logoCount = await prisma.clientLogo.count();
    return NextResponse.json({ blogCount, logoCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
