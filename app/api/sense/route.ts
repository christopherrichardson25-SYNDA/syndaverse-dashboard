import { NextResponse } from "next/server";

const SYNDABRAIN_URL = process.env.SYNDABRAIN_URL!;

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const r = await fetch(`${SYNDABRAIN_URL}/api/sense`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data: unknown = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 200 });
  }
}
