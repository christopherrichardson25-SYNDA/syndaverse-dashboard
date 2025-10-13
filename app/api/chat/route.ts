// app/api/chat/route.ts
export const runtime = "edge"; // opcional (puedes quitarlo si prefieres node)

export async function POST(req: Request) {
  const base = process.env.SYNDABRAIN_API_URL;
  if (!base) {
    return new Response(
      JSON.stringify({ error: "SYNDABRAIN_API_URL no está configurada" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    // body vacío también es válido
  }

  const r = await fetch(`${base}/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  // Pasamos el contenido tal cual (json o texto)
  const text = await r.text();
  const ct = r.headers.get("content-type") ?? "application/json";
  return new Response(text, { status: r.status, headers: { "content-type": ct } });
}
