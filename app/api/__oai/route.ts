export async function GET() {
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  return Response.json({ ok: true, model, id: "edge-check" });
}
