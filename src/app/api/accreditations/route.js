import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createAccreditation,
  listAccreditations,
  listAccreditationsForPublic,
  serializeAccreditations,
} from "@/lib/accreditations";
import { seedDefaultAccreditationsIfEmpty } from "@/lib/seedAccreditations";
import { revalidateAccreditationPages } from "@/lib/revalidateContent";
import { STATIC_ACCREDITATIONS } from "@/lib/staticSiteData";

export const dynamic = "force-dynamic";

function apiError(error, fallbackMessage) {
  const status = error?.status && Number.isInteger(error.status) ? error.status : 500;
  return NextResponse.json(
    { error: error?.message || fallbackMessage },
    { status }
  );
}

export async function GET() {
  return NextResponse.json(STATIC_ACCREDITATIONS, {
    headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
  });
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
