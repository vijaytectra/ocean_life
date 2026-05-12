import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logos = await prisma.$queryRaw`SELECT * FROM ClientLogo ORDER BY createdAt DESC`;
<<<<<<< Updated upstream
    return NextResponse.json(logos);
=======
    return new NextResponse(JSON.stringify(logos), {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Content-Type': 'application/json',
      }
    });
>>>>>>> Stashed changes
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
