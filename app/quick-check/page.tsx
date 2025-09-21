"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

/** ===== Backend response types ===== */
type ScoreResponse = {
  brand: string;
  industry: string;
  score_0_100: number; // IET
  label?: string; // letter (B, C…)
  level?: string; // text (Relational, etc.)
  wtp_impact_0_100?: number; // WTP impact if provided
};

/** ===== Helpers ===== */
const isFreeEmail = (email: string) =>
  /(gmail|outlook|hotmail|yahoo|icloud|protonmail)\./i.test(email);

const levelFrom = (r: ScoreResponse) => r.level || r.label || "—";
const wtpFrom = (r: ScoreResponse) =>
  typeof r.wtp_impact_0_100 === "number" ? Math.round(r.wtp_impact_0_100) : 0;

/** ===== Page ===== */
export default function QuickCheck() {
  // Form
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("_generic");

  // Step 1 → calculate
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<ScoreResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Step 2 → corporate email gate
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // One use per browser (soft)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("truq_used") === "1"
    ) {
      // You can enforce any extra logic here if needed
    }
  }, []);

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
          // minimal defaults to get coherent IET/NM/WTP
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
      if (typeof window !== "undefined") localStorage.setItem("truq_used", "1");
      // after calculating we still require the corporate email
      setUnlocked(false);
    } catch {
      setErrorMsg("We couldn’t calculate. Please check the backend and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onUnlock() {
    setErrorMsg("");
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setErrorMsg("Enter a valid email.");
      return;
    }
    if (isFreeEmail(email)) {
      setErrorMsg("Use a corporate email (no Gmail/Outlook/etc.).");
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

      // Best-effort lead capture; even if it fails we’ll unlock
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
      }).catch(() => {});

      setUnlocked(true);
    } catch {
      setUnlocked(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">Three quick indicators: IET, NM, and WTP.</p>

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

      {/* EMAIL GATE */}
      {score && !unlocked && (
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border">
          <p className="text-sm text-slate-600">
            To view the results, please enter your <b>corporate email</b>.
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input flex-1"
            />
            <button onClick={onUnlock} className="btn" disabled={saving}>
              {saving ? "Saving…" : "View results"}
            </button>
          </div>
        </div>
      )}

      {/* RESULTS: IET / NM / WTP */}
      {score && unlocked && (
        <div className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <KPI title="IET" value={Math.round(score.score_0_100)} />
            <KPI title="NM" value={levelFrom(score)} />
            <KPI title="WTP" value={wtpFrom(score)} />
          </div>

          <div className="mt-4 p-4 rounded-xl bg-white border shadow-sm">
            <h3 className="font-semibold mb-1">What does this mean in your industry?</h3>
            <p className="text-sm text-slate-700">
              <b>IET</b> summarizes the trust index (0–100). <b>NM</b> places the brand
              in the pyramid (e.g., “Relational”). <b>WTP</b> indicates willingness to
              pay / estimated impact. For <code>{industry}</code>, these values act as a
              starting point to prioritize improvements and shape the challenge brief.
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
