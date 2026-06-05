import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const loginId = (username || "").trim();

    // Find user by username OR email (UI label currently says "Email")
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ username: loginId }, { email: loginId }],
      },
    });

    // If no users at all, create this one as the first admin (convenience for setup)
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      user = await prisma.user.create({
        data: {
          username: loginId || "admin",
          password // In a real app, hash this!
        }
      });
    }

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    };

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'authenticated', cookieOptions);
    response.cookies.set('user_id', user.id.toString(), cookieOptions);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed", details: error.message }, { status: 500 });
  }
}
