type SenseBody = {
  sensor_id: string;
  payload?: Record<string, unknown>;
  objective?: { name?: string } | string;
};

export async function POST(req: Request) {
  const { sensor_id, objective } = (await req.json()) as SenseBody;
  const meaning = Math.random() > 0.5 ? "Alta temperatura" : "Baja temperatura";
  const resonance = Math.round((0.7 + Math.random() * 0.1) * 10000) / 10000;
  const obj = typeof objective === "string" ? objective : objective?.name ?? "General";
  return Response.json({ ok: true, sensor_id, meaning, resonance, objective: obj });
}
