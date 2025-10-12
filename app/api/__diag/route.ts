import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    [
      `USE_OPENAI=${process.env.OPENAI_API_KEY ? "True" : "False"}`,
      `OPENAI_MODEL=${process.env.OPENAI_MODEL || "gpt-4o-mini"}`,
      `SYNDABRAIN_T=0.5`,
      `SYNDABRAIN_MAXTOK=900`,
    ].join("\n"),
    { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
