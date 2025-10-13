import { NextRequest, NextResponse } from "next/server";

type ChatBody = { message?: string };

export async function POST(req: NextRequest) {
  const api = process.env.SYNDABRAIN_API_URL;
  const body = (await req.json().catch(() => ({}))) as ChatBody;
  const msg = body.message?.trim() ?? "";

  // Modo demo si no hay backend configurado
  if (!api) {
    return NextResponse.json(
      {
        reply:
          msg
            ? `🤖 (demo) Recibí: "${msg}". Configura SYNDABRAIN_API_URL para hablar con el backend real.`
            : "🤖 (demo) Hola, soy el modo demo. Configura SYNDABRAIN_API_URL para usar tu backend.",
        demo: true,
      },
      { status: 200 }
    );
  }

  // Proxy directo: NO leer .json() / .text(). Entregar el stream tal cual.
  try {
    const upstream = await fetch(api, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    // Passthrough del cuerpo + content-type
    const ct = upstream.headers.get("content-type") ?? "application/octet-stream";
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: { "content-type": ct },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: (err as Error)?.message ?? "Error al contactar el backend" },
      { status: 502 }
    );
  }
}
