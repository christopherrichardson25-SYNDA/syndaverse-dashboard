import { NextResponse } from "next/server";

function detectMode(msg: string) {
  const m = (msg || "").toLowerCase();
  if (["riesgo","impacto","ética","etica","sesgo","privacidad"].some(w=>m.includes(w))) return "ethica";
  if (["pasos","cómo","como","instalar","comandos","configura","setup",".env","endpoint","docker"].some(w=>m.includes(w))) return "tecnico";
  if (["aconsejame","qué harías","que harias","motivación","motivacion","mentoria","mentor","estancado","plan simple"].some(w=>m.includes(w))) return "mentor";
  return "cognitive";
}

function replyForMode(mode: string) {
  if (mode === "tecnico") {
    return "PASOS:\n1) Requisitos (HW/SW y versiones)\n2) Instalación (comandos y rutas)\n3) Configuración (.env / tokens / puertos)\n4) Prueba rápida (comando + salida esperada)\n5) Validaciones (KPI, error-rate)\n6) Rollback\n";
  }
  if (mode === "mentor") {
    return "Hagamos un plan simple:\n- 1 meta concreta para hoy\n- 3 tareas pequeñas (25min)\n- 1 validación al final\n¿Qué logro te animaría más?";
  }
  if (mode === "ethica") {
    return "Riesgos y mitigaciones:\n• Privacidad/datos → minimización + cifrado\n• Sesgos/daño → revisión humana en puntos críticos\n• Transparencia → registro y auditoría periódica";
  }
  return "Entiendo el objetivo. Propongo:\n1) Clarificar criterios de éxito\n2) Listar opciones y riesgos\n3) Elegir 1 experimento de 48h con métrica\n";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({}));
    const message = (body?.message || "").trim();
    let mode = (body?.mode || "cognitive").toLowerCase().trim();

    if (!message) {
      return NextResponse.json({ reply: "Dime en qué te ayudo", text: "Dime en qué te ayudo", mode: "cognitive", ethics:{status:"HARMONIC",weights:{}} });
    }

    // Auto mode (sin dependencias externas)
    if (mode === "auto") mode = detectMode(message);

    // Si hay OPENAI_KEY, podrías mejorar la respuesta; por simplicidad, mantenemos la misma lógica estable
    const reply = replyForMode(mode);

    return NextResponse.json({ reply, text: reply, mode, ethics:{status:"HARMONIC",weights:{}} });
  } catch (e: any) {
    return NextResponse.json({ ok:false, error:String(e) }, { status: 500 });
  }
}
