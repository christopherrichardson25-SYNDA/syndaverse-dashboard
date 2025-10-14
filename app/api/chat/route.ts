import { NextRequest, NextResponse } from "next/server";

const backend = process.env.SYNDABRAIN_API_URL;

// Healthcheck GET
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "syndaverse /api/chat",
    backend: backend ? "configured" : "missing",
  });
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
      { error: "SYNDABRAIN_API_URL no está configurada" },
      { status: 500 }
    );
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const url = `${backend.replace(/\/$/, "")}/api/chat`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const contentType = resp.headers.get("content-type") ?? "";
  const text = await resp.text();

  if (!resp.ok) {
    return new NextResponse(text, {
      status: resp.status,
      headers: { "content-type": contentType || "text/plain" },
    });
  }

  return new NextResponse(text, {
    status: 200,
    headers: { "content-type": contentType || "application/json" },
  });
}
