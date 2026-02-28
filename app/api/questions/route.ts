import { NextResponse } from "next/server";
import { ALL_QUESTIONS } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ success: true, data: ALL_QUESTIONS, total: ALL_QUESTIONS.length });
}
