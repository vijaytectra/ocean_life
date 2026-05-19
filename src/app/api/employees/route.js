import { NextResponse } from "next/server";
import {
  createEmployee,
  listEmployees,
  serializeEmployees,
} from "@/lib/employees";
import { FALLBACK_EMPLOYEES } from "@/lib/employeesShared";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await listEmployees();
    const employees =
      rows.length > 0 ? serializeEmployees(rows) : FALLBACK_EMPLOYEES;
    return NextResponse.json(employees, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("GET /api/employees:", error);
    return NextResponse.json(FALLBACK_EMPLOYEES, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const employee = await createEmployee(body);
    return NextResponse.json(serializeEmployees([employee])[0]);
  } catch (error) {
    console.error("POST /api/employees:", error);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
