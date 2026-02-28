import { NextRequest, NextResponse } from "next/server";
import { generateUserHistory } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") || "USR-00000";
  const data = generateUserHistory(userId);
  return NextResponse.json({ success: true, data });
}
