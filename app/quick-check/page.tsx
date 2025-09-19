"use client";

import { useEffect, useRef, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

/** --------- Tipos --------- */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number;
  label: string;               // p.ej. "B"
  level: string;               // p.ej. "Relacional"
  nm_numeric?: number;
  label_combined?: string;
  atru_0_100?: number;
  aov_0_100?: number;
  dao_0_100?: number;
  coherence_0_100?: number;
  wtp_impact_0_100?: number;
  wtp_price_gap_abs?: number | null;
  wtp_price_gap_pct?: number | null;
  weights_used?: Record<string, number>;
  components?: Record<string, number>;
};

type FormState = {
  brand: string;
  industry: string;
  sla: number;
  complaints_rate: number;
  productivity_per_labor_hour: number;
  caov: number;
  esg: number;
  governance: number;
  nps: number;           // -100..100
  satisfaction: number;
  digital_rep: number;
  brand_promise: number;
  brand_perception: number;
  wtp_premium_pct: number;
};

const initialForm: FormState = {
  brand: "",
  industry: "_generic",
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
  wtp_premium_pct: 0,
};

export default function QuickCheck() {
  const [used, setUsed] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  // 1 uso por navegador
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("truq_used") === "1") {
      setUsed(true);
    }
  }, []);

  async function onCalc() {
    if (used) return;
    const payload = {
      industry: form.industry,
      brand: form.brand || "Marca",
      weights_mode: "auto_heuristic",
      data: {
        sla: form.sla,
        complaints_rate: form.complaints_rate,
        productivity_per_labor_hour: form.productivity_per_labor_hour,
        caov: form.caov,
        esg: form.esg,
        governance: form.governance,
        nps: form.nps,
        satisfaction: form.satisfaction,
        digital_rep: form.digital_rep,
        brand_promise: form.brand_promise,
        brand_perception: form.brand_perception,
        wtp_premium_pct: form.wtp_premium_pct,
      },
    };

    const r = await fetch(`${API}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json: ScoreResponse = await r.json();
    setResult(json);
    if (typeof window !== "undefined") localStorage.setItem("truq_used", "1");
    setUsed(true);
  }

  async function onSaveLead() {
    if (!email || !result) return;
    setSaving(true);
    await fetch(`${API}/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        brand: form.brand,
        industry: form.industry,
        snapshot: result,
      }),
    });
    setSaving(false);
    alert("¡Gracias! Te contactaremos para integrar SYNDA.");
  }

  // Campos a renderizar
  const fieldsText: Array<keyof Pick<FormState, "brand" | "industry">> = [
    "brand",
    "industry",
  ];
  const fieldsNumber: Array<Exclude<keyof FormState, "brand" | "industry">> = [
    "sla",
    "complaints_rate",
    "productivity_per_labor_hour",
    "caov",
    "esg",
    "governance",
    "nps",
    "satisfaction",
    "digital_rep",
    "brand_promise",
    "brand_perception",
    "wtp_premium_pct",
  ];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">
        Un cálculo gratuito para conocer el nivel de confianza de tu marca.
      </p>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {fieldsText.map((k) => (
          <input
            key={k}
            className="input"
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value } as FormState)}
          />
        ))}
        {fieldsNumber.map((k) => (
          <input
            key={k}
            className="input"
            type="number"
            placeholder={k}
            value={form[k]}
            onChange={(e) =>
              setForm({ ...form, [k]: Number(e.target.value) } as FormState)
            }
          />
        ))}
      </div>

      <button onClick={onCalc} disabled={used} className="btn mt-4">
        {used ? "Ya utilizaste tu quick check" : "Calcular"}
      </button>

      {result && (
        <div className="mt-6 select-none" onContextMenu={(e) => e.preventDefault()}>
          <Boxes
            items={[
              ["IET", Math.round(result.score_0_100)],
              ["Banda", result.label],
              ["Nivel", result.level],
              ["ATRU", Math.round(result.atru_0_100 ?? 0)],
            ]}
          />

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border">
            <p className="text-sm text-slate-600">
              ¿Recibir el informe y recomendaciones? Deja tu correo corporativo.
            </p>
            <div className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input flex-1"
              />
              <button onClick={onSaveLead} className="btn" disabled={saving}>
                {saving ? "Guardando…" : "Guardar"}
              </button>
            </div>
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
        .select-none {
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>
    </main>
  );
}

/** Caja con valor pintado en canvas (no seleccionable) */
function Boxes({
  items,
}: {
  items: Array<[title: string, value: string | number]>;
}) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {items.map(([title, value]) => (
        <CanvasBox key={title} title={title} value={value} />
      ))}
    </div>
  );
}

function CanvasBox({ title, value }: { title: string; value: string | number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.font = "700 36px Inter, system-ui, sans-serif";
    ctx.fillText(String(value), 10, 44);
  }, [value]);

  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <canvas width={220} height={60} aria-label={`${title}: ${value}`} ref={ref} />
    </div>
  );
}
