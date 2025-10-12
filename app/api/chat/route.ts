import { NextResponse } from "next/server";

const SYNDABRAIN_URL = process.env.SYNDABRAIN_URL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const r = await fetch(`${SYNDABRAIN_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: String(e) }, { status: 200 });
  }
}
