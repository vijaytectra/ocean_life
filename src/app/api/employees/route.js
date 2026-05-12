import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Using raw query because Prisma client sync is lagging in dev server
    const employees = await prisma.$queryRaw`SELECT * FROM Employee ORDER BY priority DESC, createdAt DESC`;
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        priority: body.priority ? parseInt(body.priority) : 0,
      }
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
