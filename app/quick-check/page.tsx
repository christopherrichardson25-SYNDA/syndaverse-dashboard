"use client";

import { useEffect, useMemo, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

/** ===== Tipos mínimos que esperamos del backend ===== */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number;         // IET base
  label?: string;              // p.ej. "B"
  level?: string;              // p.ej. "Relacional"  (usado para NM)
  // Campos opcionales: intentamos derivar WTP de cualquiera de estos
  wtp_impact_0_100?: number;
  wtp_price_gap_pct?: number | null;
  wtp_price_gap_abs?: number | null;
  components?: Record<string, number>;
};

const INDUSTRIES = [
  "_generic",
  "retail",
  "cp_grocery",
  "telco",
  "banking",
  "insurance",
  "mobility",
] as const;

const FREE_MAIL = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
];

export default function QuickCheck() {
  /** ======= UI state ======= */
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState<(typeof INDUSTRIES)[number]>("_generic");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [result, setResult] = useState<ScoreResponse | null>(null);

  // “Gate” de correo corporativo
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [leadSaving, setLeadSaving] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  /** ======= Helpers ======= */
  const nm = useMemo(() => result?.level ?? result?.label ?? "-", [result]);

  // WTP: tomamos la mejor señal disponible del backend
  const wtp = useMemo(() => {
    if (!result) return null;

    // 1) Si backend entrega wtp_impact_0_100 (0..100), lo normalizamos a “%”
    if (typeof result.wtp_impact_0_100 === "number") {
      return Math.round(result.wtp_impact_0_100);
    }
    // 2) Si entrega wtp_price_gap_pct (positivo=permite cobrar +%)
    if (typeof result.wtp_price_gap_pct === "number") {
      return Math.round(result.wtp_price_gap_pct);
    }
    // 3) Si viene como componente “wtp” dentro de components
    if (result.components && typeof result.components["wtp"] === "number") {
      return Math.round(result.components["wtp"]);
    }
    return null;
  }, [result]);

  const iet = useMemo(
    () => (result ? Math.round(result.score_0_100) : null),
    [result]
  );

  // Texto explicativo según industria (breve y genérico)
  const explainer = useMemo(() => {
    const base =
      "Indicadores TRU-e: IET (confianza total), NM (nivel de marca en la pirámide) y WTP (disposición a pagar).";
    const byIndustry: Record<string, string> = {
      _generic:
        "Valores de referencia generales; interpreta las brechas y prioridades para tu categoría.",
      retail:
        "En retail, la experiencia (SLA, quejas, satisfacción) y coherencia de promesa-percepción mueven mucho el IET. WTP suele concentrarse en surtido, precio percibido y servicio.",
      cp_grocery:
        "En consumo masivo, consistencia de calidad, reputación digital y disponibilidad inciden fuerte en IET; WTP se gana con innovación y claridad de valor.",
      telco:
        "En telco, SLA y resolución de quejas son críticos para IET; WTP mejora con transparencia y mejora percibida del plan/beneficios.",
      banking:
        "En banca, confianza transaccional y trato justo pesan en IET; WTP se apoya en asesoría, beneficios y seguridad percibida.",
      insurance:
        "En seguros, claridad de cobertura, facilidad de siniestros y reputación mueven IET; WTP mejora con acompañamiento y valor tangible.",
      mobility:
        "En movilidad, puntualidad, seguridad y servicio postventa sostienen IET; WTP depende de confort, eficiencia y beneficios visibles.",
    };
    return `${base} ${byIndustry[industry] ?? byIndustry._generic}`;
  }, [industry]);

  /** ======= Actions ======= */

  async function onCalc() {
    setErr(null);
    setResult(null);

    if (!brand.trim()) {
      setErr("Ingresa una marca.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`${API}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          brand,
          weights_mode: "auto_heuristic",
          // Datos mínimos por si el backend los requiere (defaults razonables)
          data: {
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
          },
        }),
      });

      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`Backend ${r.status}: ${txt || "error"}`);
      }

      const json: ScoreResponse = await r.json();
      setResult(json);
      setLeadSaved(false);
    } catch (e: any) {
      setErr(e?.message ?? "No pudimos calcular. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function validateCorporateEmail(v: string) {
    const m = v.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) return "Ingresa un correo válido.";
    const domain = m.split("@")[1] || "";
    if (FREE_MAIL.includes(domain)) {
      return "Usa un correo corporativo (no Gmail/Outlook/etc.).";
    }
    return null;
  }

  async function onSaveLead() {
    const err = validateCorporateEmail(email);
    setEmailError(err);
    if (err || !result) return;

    setLeadSaving(true);
    try {
      const r = await fetch(`${API}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          brand: result.brand ?? brand,
          industry: result.industry ?? industry,
          snapshot: {
            iet,
            nm,
            wtp,
          },
          source: "quick-check",
        }),
      });

      if (!r.ok) {
        const t = await r.text();
        throw new Error(`Lead ${r.status}: ${t}`);
      }
      setLeadSaved(true);
    } catch (e: any) {
      setEmailError(e?.message ?? "No pudimos guardar el correo.");
    } finally {
      setLeadSaving(false);
    }
  }

  /** ======= Render ======= */
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">3 indicadores rápidos: IET, NM y WTP.</p>

      {/* Formulario mínimo */}
      <div className="mt-5 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Brand</label>
          <input
            className="input mt-1 w-full"
            placeholder="p.ej, Acme Corp"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Industry</label>
          <select
            className="input mt-1 w-full"
            value={industry}
            onChange={(e) => setIndustry(e.target.value as any)}
          >
            {INDUSTRIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <button onClick={onCalc} className="btn mt-2" disabled={loading}>
          {loading ? "Calculando…" : "Calcular"}
        </button>

        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>

      {/* Gate de correo corporativo para ver resultados */}
      {result && !leadSaved && (
        <div className="mt-6 rounded-xl border bg-slate-50 p-4">
          <p className="text-sm text-slate-700">
            Para ver los resultados, deja tu <b>correo corporativo</b>.
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="email"
              className="input flex-1"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              onBlur={() => setEmailError(validateCorporateEmail(email))}
            />
            <button className="btn" onClick={onSaveLead} disabled={leadSaving}>
              {leadSaving ? "Guardando…" : "Ver resultados"}
            </button>
          </div>
          {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
        </div>
      )}

      {/* Resultados (solo tras correo) */}
      {result && leadSaved && (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Metric title="IET" value={iet ?? "-"} />
            <Metric title="NM" value={nm ?? "-"} />
            <Metric title="WTP (%)" value={wtp ?? "-"} />
          </div>

          <div className="mt-5 rounded-xl border p-4">
            <p className="text-slate-700 text-sm">{explainer}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .input {
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          border-radius: 12px;
          background: #fff;
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

function Metric({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-1 text-3xl font-extrabold">{value}</div>
    </div>
  );
}
