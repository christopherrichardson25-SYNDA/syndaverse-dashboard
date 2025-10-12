import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ ok: false, why: "no OPENAI_API_KEY" });
    }
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    return NextResponse.json({ ok: true, model, id: "local-check" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
