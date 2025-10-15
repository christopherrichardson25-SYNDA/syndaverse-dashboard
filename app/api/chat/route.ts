// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";       // no cache
export const revalidate = 0;

const backend = process.env.SYNDABRAIN_API_URL?.replace(/\/$/, "") || "";

// GET: health
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "syndaverse /api/chat",
      backend: backend ? "configured" : "missing",
      backend_url: backend || null,
      backend_path_primary: "/api/chat",
      backend_path_fallback: "/chat",
      target_preview: backend ? `${backend}/api/chat` : null,
    },
    { headers: { "cache-control": "no-store" } }
  );
}

type ChatBody = {
  message: string;
  userId?: string | null;
  context?: Record<string, unknown>;
};

// POST: proxy con fallback /api/chat -> /chat
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

  const primary = `${backend}/api/chat`;
  const fallback = `${backend}/chat`;

  async function hit(url: string) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 30000);
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
        cache: "no-store",
        next: { revalidate: 0 },
      });
      const text = await resp.text();
      clearTimeout(t);
      return { resp, text };
    } catch (e: any) {
      clearTimeout(t);
      throw e;
    }
  }

  try {
    // 1) intenta /api/chat
    let { resp, text } = await hit(primary);

    // 2) si 404, reintenta /chat
    if (resp.status === 404) {
      const r2 = await hit(fallback);
      resp = r2.resp;
      text = r2.text;
    }

    const contentType = resp.headers.get("content-type") || "application/json";
    if (text && text.length > 0) {
      return new NextResponse(text, { status: resp.status, headers: { "content-type": contentType } });
    }
    return NextResponse.json(
      { ok: resp.ok, status: resp.status, upstream: "syndabrain", note: "Empty body from upstream" },
      { status: resp.status }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || String(e), upstream: "syndabrain" },
      { status: 502 }
    );
  }
}
