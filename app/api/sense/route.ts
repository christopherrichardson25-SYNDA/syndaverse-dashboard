import { NextResponse } from "next/server";

function simpleInterpret(payload: any): string {
  let t: number | null = null;
  if (payload && typeof payload === "object") {
    if ("temperature" in payload) t = Number(payload.temperature);
    else if ("temp" in payload) t = Number(payload.temp);
  }
  if (typeof t === "number" && !Number.isNaN(t)) {
    if (t > 35) return "Temperatura MUY alta";
    if (t > 30) return "Alta temperatura";
    if (t < 5)  return "Temperatura MUY baja";
    if (t < 10) return "Baja temperatura";
    return "Temperatura ok";
  }
  return "Evento sensor: " + JSON.stringify(payload)?.slice(0,120);
}

// placeholder simple de “resonancia”
function resonanceBetween(a: string, b: string): number {
  // valor estable fijo (si querés, después lo cambiamos por embeddings)
  return 0.75;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({}));
    const sensor_id = (body?.sensor_id || "").trim();
    const reading   = body?.payload || {};
    const objective = body?.objective?.name || "Confort";
    const meaning   = simpleInterpret(reading);
    const r = resonanceBetween(meaning, objective);

    return NextResponse.json({
      ok: true,
      sensor_id: sensor_id || null,
      meaning,
      resonance: Number(r.toFixed(4)),
      objective
    });
  } catch (e: any) {
    // Siempre JSON (nada de “Internal Server Error” plano)
    return NextResponse.json({ ok:false, error:String(e) }, { status: 500 });
  }
}
