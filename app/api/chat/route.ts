// app/api/chat/route.ts
export const runtime = "nodejs"; // o "edge" si prefieres

type ChatRequest = { message?: string };

const SYNDABRAIN_API_URL = process.env.SYNDABRAIN_API_URL;

/** GET: pequeño healthcheck para que no 404 y puedas hacer `curl | jq` */
export async function GET() {
  return new Response(
    JSON.stringify({
      ok: true,
      service: "syndaverse /api/chat",
      backend: SYNDABRAIN_API_URL ? "configured" : "missing",
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

/** POST: proxyea al backend de SyndaBrain */
export async function POST(req: Request) {
  if (!SYNDABRAIN_API_URL) {
    return new Response(
      JSON.stringify({ error: "SYNDABRAIN_API_URL no está configurada" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let payload: ChatRequest;
  try {
    payload = (await req.json()) as ChatRequest;
  } catch {
    return new Response(
      JSON.stringify({ error: "JSON inválido" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const message = (payload.message ?? "").trim();
  if (!message) {
    return new Response(
      JSON.stringify({ error: "message requerido" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const upstream = await fetch(`${SYNDABRAIN_API_URL}/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message }),
    });

    // Reenvía status y cuerpo tal cual (forzando JSON en caso de texto)
    const text = await upstream.text();
    const isJSON = upstream.headers.get("content-type")?.includes("application/json");
    return new Response(isJSON ? text : JSON.stringify({ data: text }), {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Upstream error: ${(err as Error).message}` }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}

