// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const backend = process.env.SYNDABRAIN_API_URL;

// Salud: GET
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "syndaverse /api/chat",
      backend: backend ? "configured" : "missing",
    },
    { headers: { "cache-control": "no-store" } }
  );
}

type ChatBody = {
  message: string;
  userId?: string | null;
  context?: Record<string, unknown>;
};

// Proxy POST -> Syndabrain (/api/chat con fallback a /chat)
export async function POST(req: NextRequest) {
  if (!backend) {
    return NextResponse.json(
      { ok: false, error: "SYNDABRAIN_API_URL not configured" },
      { status: 500 }
    );
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const base = backend.replace(/\/$/, "");
  const primary = `${base}/api/chat`;
  const fallback = `${base}/chat`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30_000);

  const doFetch = async (url: string) =>
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      cache: "no-store",
      next: { revalidate: 0 },
    });

  try {
    let resp = await doFetch(primary);
    if (resp.status === 404) resp = await doFetch(fallback);
    clearTimeout(timer);

    const text = await resp.text();
    const contentType = resp.headers.get("content-type") ?? "application/json";

    if (text) {
      return new NextResponse(text, {
        status: resp.status,
        headers: { "content-type": contentType },
      });
    }

    return NextResponse.json(
      {
        ok: resp.ok,
        status: resp.status,
        upstream: "syndabrain",
        note: "Empty body from upstream",
      },
      { status: resp.status }
    );
  } catch (e: unknown) {
    clearTimeout(timer);
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, error: message, upstream: "syndabrain" },
      { status: 502 }
    );
  }
}
