import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // 1️⃣ Variables de entorno
  const base = process.env.SYNDABRAIN_API_URL;
  const path = process.env.SYNDABRAIN_API_PATH || "/chat";

  if (!base) {
    return Response.json(
      { error: "SYNDABRAIN_API_URL no está configurada" },
      { status: 500 }
    );
  }

  // 2️⃣ Leer el body del request (una sola vez)
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  // 3️⃣ Construir la URL completa del backend
  const url = `${base.replace(/\/+$/, "")}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  try {
    // 4️⃣ Enviar al backend Python/FastAPI
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 5️⃣ Leer respuesta una sola vez (sin consumir doble)
    const text = await upstream.text();
    const ct =
      upstream.headers.get("content-type") ?? "text/plain; charset=utf-8";

    // 6️⃣ Devolver el mismo contenido al frontend
    return new Response(text, {
      status: upstream.status,
      headers: { "content-type": ct },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return Response.json(
      { error: `Proxy error: ${msg}`, target: url },
      { status: 502 }
    );
  }
}
