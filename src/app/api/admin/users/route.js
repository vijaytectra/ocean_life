import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        mobile: body.mobile,
        roleId: body.roleId ? parseInt(body.roleId) : null,
        status: body.status || 'active'
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
