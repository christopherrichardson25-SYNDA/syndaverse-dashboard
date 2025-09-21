"use client";

import { useMemo, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";
const SHOW_API_DEBUG =
  (process.env.NEXT_PUBLIC_SHOW_API_DEBUG ?? "").toLowerCase() === "true";

/** ===== Backend response types ===== */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number; // IET
  label?: string; // letter (B, C…)
  level?: string; // text (“Relational”, etc.)
  wtp_impact_0_100?: number; // WTP impact if present
};

/** ===== Helpers ===== */
const levelFrom = (r: ScoreResponse) => r.level || r.label || "—";
const wtpFrom = (r: ScoreResponse) =>
  typeof r.wtp_impact_0_100 === "number" ? Math.round(r.wtp_impact_0_100) : 0;

export default function QuickCheck() {
  // Form
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("_generic");

  // API state
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<ScoreResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onCalc() {
    setErrorMsg("");
    if (!brand.trim()) {
      setErrorMsg("Please enter a brand.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        industry,
        brand: brand.trim(),
        weights_mode: "auto_heuristic",
        data: {
          // minimal defaults to get a coherent IET/NM/WTP
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
      };

      const r = await fetch(`${API}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`API /score ${r.status}`);
      const json: ScoreResponse = await r.json();
      setScore(json);
    } catch {
      setScore(null);
      setErrorMsg("We couldn't calculate. Please check the backend and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">Three quick indicators: IET, NM, and WTP.</p>

      {SHOW_API_DEBUG && (
        <p className="mt-1 text-xs text-slate-400">
          API: <a href={API} className="underline">{API}</a>
        </p>
      )}

      {/* FORM */}
      <div className="mt-4 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Brand</label>
          <input
            className="input w-full"
            placeholder="e.g., Acme Corp"
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
          {loading ? "Calculating…" : "Calculate"}
        </button>

        {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
      </div>

      {/* RESULTS: IET / NM / WTP */}
      {score && (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <KPI title="IET" value={Math.round(score.score_0_100)} />
            <KPI title="NM" value={levelFrom(score)} />
            <KPI title="WTP" value={wtpFrom(score)} />
          </div>

          <div className="mt-4 p-4 rounded-xl bg-white border shadow-sm">
            <h3 className="font-semibold mb-1">What does it mean for your industry?</h3>
            <p className="text-sm text-slate-700">
              <b>IET</b> summarizes the trust index (0–100). <b>NM</b> places the brand in the
              pyramid (e.g., “Relational”). <b>WTP</b> indicates willingness-to-pay / estimated impact.
              For <code>{industry}</code>, these values are a starting point to prioritize improvements
              and define the challenge brief.
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

/** ------- Simple KPI component ------- */
function KPI({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border p-4 bg-white shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-3xl font-bold mt-1">{String(value)}</div>
    </div>
  );
}
