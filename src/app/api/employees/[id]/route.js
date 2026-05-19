import { NextResponse } from "next/server";
import { deleteEmployee, serializeEmployee, updateEmployee } from "@/lib/employees";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    const body = await request.json();
    const employee = await updateEmployee(id, body);
    return NextResponse.json(serializeEmployee(employee));
  } catch (error) {
    console.error("PUT /api/employees/[id]:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    await deleteEmployee(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/employees/[id]:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
