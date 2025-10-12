import { NextResponse } from "next/server";

const SYNDABRAIN_URL = process.env.SYNDABRAIN_URL!;
if (!SYNDABRAIN_URL) console.warn("SYNDABRAIN_URL no está definido");

export async function GET() {
  try {
    const r = await fetch(`${SYNDABRAIN_URL}/__oai`, { cache: "no-store" });
    const data: unknown = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 200 });
  }
}
