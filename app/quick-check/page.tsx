"use client";

import { useEffect, useRef, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

/* --------- Tipos --------- */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number;
  label: string;
  level: string;
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
  nps: number;
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

// dominios NO corporativos
const PUBLIC_DOMAINS = [
  "gmail.com","googlemail.com","yahoo.com","yahoo.es","hotmail.com",
  "outlook.com","live.com","icloud.com","proton.me","protonmail.com",
  "aol.com","gmx.com"
];

export default function QuickCheck() {
  const [used, setUsed] = useState(false);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("truq_used") === "1") {
      setUsed(true);
    }
  }, []);

  function isCorporateEmail(value: string): boolean {
    const m = value.trim().toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!m) return false;
    const domain = value.split("@").pop()!;
    return !PUBLIC_DOMAINS.includes(domain);
  }

  async function onCalc() {
    setErrorMsg(null);
    if (used) return;
    if (!form.brand || !form.industry) {
      setErrorMsg("Completa Brand e Industry.");
      return;
    }
    setLoading(true);
    try {
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
    } catch {
      setErrorMsg("No pudimos calcular ahora. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function onSaveLead() {
    if (!isCorporateEmail(email)) {
      setErrorMsg("Usa un correo corporativo (no Gmail/Outlook/etc.).");
      return;
    }
    if (!result) return;
    setSaving(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`${API}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          brand: form.brand,
          industry: form.industry,
          snapshot: result,
          source: "quick-check",
        }),
      });
      if (!res.ok) console.warn("Lead endpoint not available:", res.status);
      setEmailOk(true);
    } catch (e) {
      console.warn("Lead save error:", e);
      setEmailOk(true);
    } finally {
      setSaving(false);
    }
  }

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

      {/* Cabecera */}
      <div className="grid md:grid-cols-3 gap-3 mt-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Brand</label>
          <input
            className="input"
            placeholder="p.ej. Acme Corp"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Industry</label>
          <select
            className="input"
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
          >
            <option value="_generic">_generic</option>
            <option value="retail">retail</option>
            <option value="banking">banking</option>
            <option value="telco">telco</option>
            <option value="energy">energy</option>
            <option value="services">services</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">SLA</label>
          <input
            type="number"
            className="input"
            value={form.sla}
            onChange={(e) => setForm({ ...form, sla: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Numéricos */}
      <div className="grid md:grid-cols-3 gap-3 mt-3">
        {fieldsNumber
          .filter((k) => k !== "sla")
          .map((k) => (
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

      {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}

      <button onClick={onCalc} disabled={used || loading} className="btn mt-4">
        {loading ? "Calculando…" : used ? "Ya utilizaste tu quick check" : "Calcular"}
      </button>

      {/* RESULTADOS */}
      {result && (
        <div className="relative mt-6">
          {/* Bloqueo hasta correo corporativo */}
          {!emailOk && (
            <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-white/80 backdrop-blur">
              <div className="w-full max-w-xl rounded-xl border bg-white p-4">
                <p className="text-sm text-slate-700">
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
                  <button onClick={onSaveLead} className="btn" disabled={saving}>
                    {saving ? "Guardando…" : "Ver resultados"}
                  </button>
                </div>
                {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
              </div>
            </div>
          )}

          {/* Vista (no seleccionable) */}
          <div className="select-none" onContextMenu={(e) => e.preventDefault()}>
            <Boxes
              items={[
                ["IET", Math.round(result.score_0_100)],
                ["Banda", result.label],
                ["Nivel", result.level],
                ["ATRU", Math.round(result.atru_0_100 ?? 0)],
              ]}
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Card title="AOV (objetivo)" value={Math.round(result.aov_0_100 ?? 0)} />
              <Card title="DAO (percepción)" value={Math.round(result.dao_0_100 ?? 0)} />
              <Card title="Coherencia" value={Math.round(result.coherence_0_100 ?? 0)} />
              <Card title="WTP impacto" value={Math.round(result.wtp_impact_0_100 ?? 0)} />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 12px;
          background: #fff;
        }
        .btn {
          background: #0b2742;
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
        }
        .select-none { -webkit-user-select: none; user-select: none; }
      `}</style>
    </main>
  );
}

/** ------- Presentación de cajas ------- */
function Boxes({ items }: { items: Array<[title: string, value: string | number]> }) {
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
    const el = ref.current; if (!el) return;
    const ctx = el.getContext("2d"); if (!ctx) return;
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

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-1 text-3xl font-bold">{value}</div>
    </div>
  );
}
