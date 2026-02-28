import { NextResponse } from "next/server";
import { generateOrder } from "@/lib/mock-data";

export async function GET() {
  const orders = Array.from({ length: 10 }, () => generateOrder());
  return NextResponse.json({ success: true, data: orders });
}
