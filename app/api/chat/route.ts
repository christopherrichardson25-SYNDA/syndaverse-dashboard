// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const backend =
      process.env.NEXT_PUBLIC_SYNDABRAIN_URL || "https://syndabrain.vercel.app";

    const r = await fetch(`${backend}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await r.text();
    return new NextResponse(data, { status: 200 });
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Syndabrain endpoint activo",
  });
}
