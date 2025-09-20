"use client";

import { useEffect, useMemo, useState } from "react";

const API = process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

/** ===== Tipos de respuesta del backend ===== */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number; // IET
  label?: string;      // letra (B, C...)
  level?: string;      // texto (Relacional, etc.)
  wtp_impact_0_100?: number; // impacto de WTP si viene
};

/** ===== Helpers ===== */
const isFreeEmail = (email: string) =>
  /(gmail|outlook|hotmail|yahoo|icloud|protonmail)\./i.test(email);

const levelFrom = (r: ScoreResponse) => r.level || r.label || "—";
const wtpFrom = (r: ScoreResponse) =>
  typeof r.wtp_impact_0_100 === "number" ? Math.round(r.wtp_impact_0_100) : 0;

/** ===== Página ===== */
export default function QuickCheck() {
  // Form
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("_generic");

  // Paso 1 → calcular
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<ScoreResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Paso 2 → gate por correo corporativo
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // 1 uso por navegador (solo para el cálculo)
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("truq_used") === "1") {
      // permitimos recalcular, pero la UI no lo bloquea duro (tu decides)
    }
  }, []);

  async function onCalc() {
    setErrorMsg("");
    if (!brand.trim()) {
      setErrorMsg("Ingresa la marca.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        industry,
        brand: brand.trim(),
        weights_mode: "auto_heuristic",
        data: {
          // valores default mínimos para obtener un IET/NM/WTP coherentes
          sla: 70,
          complaints_rate: 30,
          productivity_per_labor_hour: 60,
          caov: 55,
          esg: 58,
          governance: 62,
          nps: 10,
          satisfaction: 72,
          digital_rep: 65,
          brand_promise: 70,
          brand_perception: 66,
          wtp_premium_pct: 0
        },
      };

      const r = await fetch(`${API}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`API /score ${r.status}`);
      const json: ScoreResponse = await r.json();
      setScore(json);
      if (typeof window !== "undefined") localStorage.setItem("truq_used", "1");
      // al calcular, aún NO mostramos; pedimos correo corporativo
      setUnlocked(false);
    } catch (e: any) {
      setErrorMsg("No pudimos calcular. Revisa el backend o intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function onUnlock() {
    setErrorMsg("");
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setErrorMsg("Escribe un correo válido.");
      return;
    }
    if (isFreeEmail(email)) {
      setErrorMsg("Usa un correo corporativo (no Gmail/Outlook/etc.).");
      return;
    }
    if (!score) return;

    setSaving(true);
    try {
      const snapshot = {
        iet: Math.round(score.score_0_100 || 0),
        nm: levelFrom(score),
        wtp: wtpFrom(score),
      };

      await fetch(`${API}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          brand,
          industry,
          snapshot,
          source: "quick-check",
        }),
      }).catch(() => { /* si /lead no está, igual desbloqueamos */ });

      setUnlocked(true);
    } catch {
      // incluso con error de /lead dejamos ver, pero avisamos
      setUnlocked(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">3 indicadores rápidos: IET, NM y WTP.</p>

      {/* FORM */}
      <div className="mt-4 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Brand</label>
          <input
            className="input w-full"
            placeholder="Ej. Acme Corp"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Industry</label>
          <select
            className="input w-full"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="_generic">_generic</option>
            <option value="banking">banking</option>
            <option value="retail">retail</option>
            <option value="telco">telco</option>
          </select>
        </div>

        <button onClick={onCalc} className="btn w-fit" disabled={loading}>
          {loading ? "Calculando…" : "Calcular"}
        </button>

        {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
      </div>

      {/* GATE DE CORREO */}
      {score && !unlocked && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border">
          <p className="text-sm text-slate-600">
            Para ver los resultados, deja tu <b>correo corporativo</b>.
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input flex-1"
            />
            <button onClick={onUnlock} className="btn" disabled={saving}>
              {saving ? "Guardando…" : "Ver resultados"}
            </button>
          </div>
        </div>
      )}

      {/* RESULTADOS: SOLO IET / NM / WTP */}
      {score && unlocked && (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <KPI title="IET" value={Math.round(score.score_0_100)} />
            <KPI title="NM" value={levelFrom(score)} />
            <KPI title="WTP" value={wtpFrom(score)} />
          </div>

          <div className="mt-4 p-4 rounded-xl bg-white border shadow-sm">
            <h3 className="font-semibold mb-1">¿Qué significa en tu industria?</h3>
            <p className="text-sm text-slate-700">
              <b>IET</b> resume el índice de confianza (0–100). <b>NM</b> ubica la marca
              en la pirámide (ej. “Relacional”). <b>WTP</b> indica disposición a pagar/impacto
              estimado. Para <code>{industry}</code>, estos valores sirven de punto de partida
              para priorizar mejoras y definir el brief del desafío.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 12px;
        }
        .btn {
          background: #0b2742;
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
        }
      `}</style>
    </main>
  );
}

/** ------- Componente simple de KPI ------- */
function KPI({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-3xl font-bold mt-1">{String(value)}</div>
    </div>
  );
}
