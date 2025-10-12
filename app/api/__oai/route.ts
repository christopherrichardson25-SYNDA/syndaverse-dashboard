import { NextResponse } from "next/server";

const SYNDABRAIN_URL = process.env.SYNDABRAIN_URL!; // p.ej. https://tu-backend-synda.com

export async function GET() {
  try {
    const r = await fetch(`${SYNDABRAIN_URL}/__oai`, { cache: "no-store" });
    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: String(e) }, { status: 200 });
  }
}
