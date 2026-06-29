import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { seedDefaultAccreditationsIfEmpty } from "@/lib/seedAccreditations";
import { revalidateAccreditationPages } from "@/lib/revalidateContent";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = (await cookies()).get("admin_session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedDefaultAccreditationsIfEmpty();
    if (!result.skipped) {
      revalidateAccreditationPages();
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/admin/restore-accreditations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to restore accreditations" },
      { status: 500 }
    );
  }
}
