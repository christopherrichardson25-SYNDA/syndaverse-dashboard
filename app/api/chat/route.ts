import { NextResponse } from "next/server";

type ChatIn = { message?: string };

function joinUrl(base: string, path: string) {
  const b = base.replace(/\/+$/,"");
  const p = path.replace(/^\/+/,"");
  return `${b}/${p}`;
}

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as ChatIn;
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const backend = process.env.NEXT_PUBLIC_SYNDABRAIN_URL ?? "https://syndabrain.vercel.app";
    const url = joinUrl(backend, "chat");

    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const text = await r.text();
    const ct = r.headers.get("content-type") ?? "text/plain; charset=utf-8";
    return new NextResponse(text, { status: r.status, headers: { "content-type": ct } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Syndabrain endpoint activo" });
}
