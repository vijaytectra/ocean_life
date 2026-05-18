import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

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

    // Set simple session cookies
    const response = NextResponse.json({ success: true });
    const cookieStore = await cookies();
    
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    cookieStore.set('user_id', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed", details: error.message }, { status: 500 });
  }
}
