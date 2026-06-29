import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { seedDefaultEmployeesIfEmpty } from "@/lib/seedEmployees";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = (await cookies()).get("admin_session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedDefaultEmployeesIfEmpty();
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/admin/restore-employees:", error);
    return NextResponse.json(
      { error: error.message || "Failed to restore team members" },
      { status: 500 }
    );
  }
}
