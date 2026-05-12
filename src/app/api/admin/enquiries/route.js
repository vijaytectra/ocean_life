import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const enquiry = await prisma.enquiry.create({
      data: {
        type: body.type,
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        subject: body.subject,
        message: body.message
      }
    });
    return NextResponse.json(enquiry);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
