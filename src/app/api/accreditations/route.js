import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createAccreditation,
  listAccreditations,
  listAccreditationsForPublic,
  serializeAccreditations,
} from "@/lib/accreditations";
import { revalidateAccreditationPages } from "@/lib/revalidateContent";

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

    if (session) {
      const rows = await listAccreditations();
      return NextResponse.json(serializeAccreditations(rows), {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
      });
    }

    const items = await listAccreditationsForPublic();
    return NextResponse.json(items, {
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  } catch (error) {
    console.error("GET /api/accreditations:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const item = await createAccreditation(body);
    revalidateAccreditationPages();
    return NextResponse.json(serializeAccreditations([item])[0]);
  } catch (error) {
    console.error("POST /api/accreditations:", error);
    return apiError(error, "Failed to create accreditation");
  }
}
