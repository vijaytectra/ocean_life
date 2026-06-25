import { NextResponse } from "next/server";
import { deleteEmployee, serializeEmployee, updateEmployee } from "@/lib/employees";

export const dynamic = "force-dynamic";

function apiError(error, fallbackMessage) {
  const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
  return NextResponse.json(
    { error: error?.message || fallbackMessage },
    { status }
  );
}

export async function PUT(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const body = await request.json();
    const employee = await updateEmployee(id, body);
    return NextResponse.json(serializeEmployee(employee));
  } catch (error) {
    console.error("PUT /api/employees/[id]:", error);
    return apiError(error, "Failed to update employee");
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    await deleteEmployee(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/employees/[id]:", error);
    return apiError(error, "Failed to delete employee");
  }
}
