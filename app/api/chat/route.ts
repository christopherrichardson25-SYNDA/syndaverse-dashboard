type Mode = "auto" | "tecnico" | "mentor" | "ethica" | "cognitive";
type ChatBody = { message: string; mode?: Mode };

export async function POST(req: Request) {
  const body = (await req.json()) as ChatBody;
  const mode: Mode = body.mode ?? "auto";
  return Response.json({
    reply: "Hola, ¿en qué te ayudo?",
    text: "Hola, ¿en qué te ayudo?",
    mode,
    ethics: { status: "HARMONIC", weights: {} }
  });
}
