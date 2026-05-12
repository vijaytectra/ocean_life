import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const id = parseInt((await params).id);
    const body = await request.json();
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        priority: body.priority !== undefined ? parseInt(body.priority) : undefined,
      }
    });
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt((await params).id);
    await prisma.employee.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
