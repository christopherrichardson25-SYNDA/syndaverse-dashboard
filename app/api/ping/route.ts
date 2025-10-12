import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, who: "dashboard", now: Date.now() });
}
