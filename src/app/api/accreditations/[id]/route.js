import { NextResponse } from "next/server";
import {
  deleteAccreditation,
  serializeAccreditation,
  updateAccreditation,
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

export async function PUT(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    const body = await request.json();
    const item = await updateAccreditation(id, body);
    revalidateAccreditationPages();
    return NextResponse.json(serializeAccreditation(item));
  } catch (error) {
    console.error("PUT /api/accreditations/[id]:", error);
    return apiError(error, "Failed to update accreditation");
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }
    await deleteAccreditation(id);
    revalidateAccreditationPages();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/accreditations/[id]:", error);
    return apiError(error, "Failed to delete accreditation");
  }
}
