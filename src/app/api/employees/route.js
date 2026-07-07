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
  return NextResponse.json(FALLBACK_EMPLOYEES, {
    headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
  });
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
