// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// ====== Resolución robusta de BACKEND ======
function resolveBackendBase(): string | null {
  const raw =
    process.env.SYNDABRAIN_URL ||
    process.env.NEXT_PUBLIC_BRAIN_API ||
    process.env.SYNDABRAIN_API_URL ||
    null;

  if (!raw) return null;
  try {
    // Normaliza y valida la URL
    const u = new URL(raw);
    // quita trailing slash
    return u.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}

const BACKEND_BASE = resolveBackendBase();

// Salud: GET
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "syndaverse /api/chat",
      backend: BACKEND_BASE ? "configured" : "missing_or_invalid",
      resolved: BACKEND_BASE || null,
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
  if (!BACKEND_BASE) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "SyndaBrain URL not configured. Set SYNDABRAIN_URL or NEXT_PUBLIC_BRAIN_API (or SYNDABRAIN_API_URL).",
      },
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

  const primary = `${BACKEND_BASE}/api/chat`;
  const fallback = `${BACKEND_BASE}/chat`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30_000);

  const doFetch = async (url: string) =>
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Puedes pasar señales útiles al backend:
        "x-synda-source": "dashboard/api/chat",
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      cache: "no-store",
      next: { revalidate: 0 },
    });

  try {
    let resp = await doFetch(primary);
    if (resp.status === 404) {
      // Compatibilidad con antiguos backends
      resp = await doFetch(fallback);
    }
    clearTimeout(timer);

    // Pasamos el body tal cual venga (json o texto)
    const text = await resp.text();
    const contentType = resp.headers.get("content-type") ?? "application/json";

    // Devolver el cuerpo del upstream (si lo hay) con el mismo status
    if (text && text.length > 0) {
      return new NextResponse(text, {
        status: resp.status,
        headers: { "content-type": contentType, "cache-control": "no-store" },
      });
    }

    // Upstream sin cuerpo; devolvemos un JSON informativo
    return NextResponse.json(
      {
        ok: resp.ok,
        status: resp.status,
        upstream: "syndabrain",
        note: "Empty body from upstream",
      },
      { status: resp.status, headers: { "cache-control": "no-store" } }
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


