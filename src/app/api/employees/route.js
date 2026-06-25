import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createEmployee,
  listEmployees,
  serializeEmployees,
} from "@/lib/employees";
import { FALLBACK_EMPLOYEES } from "@/lib/employeesShared";

export const dynamic = "force-dynamic";

function apiError(error, fallbackMessage) {
  const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
  return NextResponse.json(
    { error: error?.message || fallbackMessage },
    { status }
  );
}

export async function GET() {
  try {
    const session = (await cookies()).get("admin_session");
    const rows = await listEmployees();

    // Admin must see real DB rows only — fallbacks are not editable records.
    if (session) {
      return NextResponse.json(serializeEmployees(rows), {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      });
    }

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
    return apiError(error, "Failed to create employee");
  }
}
