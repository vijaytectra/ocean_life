import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Find user
    let user = await prisma.user.findUnique({
      where: { username }
    });

    // If no users at all, create this one as the first admin (convenience for setup)
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      user = await prisma.user.create({
        data: {
          username,
          password // In a real app, hash this!
        }
      });
    }

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set a simple session cookie
    const response = NextResponse.json({ success: true });
    (await cookies()).set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
