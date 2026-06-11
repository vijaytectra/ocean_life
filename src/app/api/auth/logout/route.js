import { NextResponse } from "next/server";
import { clearAdminCookies } from "@/lib/authCookies";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAdminCookies(response);
  return response;
}
