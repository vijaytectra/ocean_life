import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

function parsePermissions(raw) {
  if (!raw || typeof raw !== 'string') return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session')?.value;
    const userIdStr = cookieStore.get('user_id')?.value;

    if (!session || !userIdStr) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(userIdStr, 10);
    if (Number.isNaN(userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
            permissions: parsePermissions(user.role.permissions),
          }
        : null,
    });
  } catch (error) {
    console.error('GET /api/admin/me failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
