import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminCookieOptions } from "@/lib/authCookies";

async function findUserByLoginId(loginId) {
  const normalized = loginId.trim();
  if (!normalized) return null;

  const byUsername = await prisma.user.findFirst({
    where: { username: normalized },
  });
  if (byUsername) return byUsername;

  const byEmail = await prisma.user.findFirst({
    where: { email: normalized },
  });
  if (byEmail) return byEmail;

  // Case-insensitive email match (SQLite has no Prisma insensitive mode)
  const users = await prisma.user.findMany({
    where: { email: { not: null } },
    select: { id: true, username: true, email: true, password: true, status: true },
  });
  const lower = normalized.toLowerCase();
  return users.find((user) => user.email?.toLowerCase() === lower) || null;
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const loginId = (username || "").trim();
    const loginPassword = (password || "").trim();

    if (!loginId || !loginPassword) {
      return NextResponse.json({ error: "Email/username and password are required" }, { status: 400 });
    }

    let user = await findUserByLoginId(loginId);

    // First-time setup: create admin when no users exist
    const userCount = await prisma.user.count();
    if (userCount === 0) {
      user = await prisma.user.create({
        data: {
          username: loginId.includes("@") ? loginId.split("@")[0] : loginId || "admin",
          email: loginId.includes("@") ? loginId : null,
          password: loginPassword,
        },
      });
    }

    if (!user || user.password !== loginPassword) {
      return NextResponse.json({ error: "Invalid email/username or password" }, { status: 401 });
    }

    if (user.status && user.status !== "active") {
      return NextResponse.json({ error: "This account is inactive. Contact an administrator." }, { status: 403 });
    }

    const cookieOptions = getAdminCookieOptions();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", cookieOptions);
    response.cookies.set("user_id", user.id.toString(), cookieOptions);

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed", details: error.message }, { status: 500 });
  }
}
