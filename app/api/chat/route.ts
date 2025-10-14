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

// Proxy POST -> Syndabrain
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
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const target = `${backend.replace(/\/$/, "")}/api/chat`;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000); // 30s

    const resp = await fetch(target, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      // importante en Vercel/Next:
      cache: "no-store",
      next: { revalidate: 0 },
    }).catch((e) => {
      // Diferenciar abort/timeout
      if (e.name === "AbortError") throw new Error("Upstream timeout");
      throw e;
    });
    clearTimeout(timer);

    const contentType = resp.headers.get("content-type") || "";

    // Si viene cuerpo, pásalo tal cual:
    const text = await resp.text();
    if (text && text.length > 0) {
      return new NextResponse(text, {
        status: resp.status,
        headers: { "content-type": contentType || "application/json" },
      });
    }

    // Si NO viene cuerpo, fabrica uno legible:
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
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : String(e),
        upstream: "syndabrain",
      },
      { status: 502 }
    );
  }
}
