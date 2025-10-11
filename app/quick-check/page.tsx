"use client";

import { useState } from "react";

type QuickCheckInput = {
  brand: string;
  industry: string;
  price: number | "";
  wtp: number | "";
  totalTrust: number | "";   // 0-100
  iet: number | "";          // 0-100 (coherencia / IET)
};

type QuickResult = {
  gap: number;              // WTP - Price
  pyramidLevel: "Low" | "Mid" | "High";
  trustMsg: string;
};

export default function QuickCheckPage() {
  const [input, setInput] = useState<QuickCheckInput>({
    brand: "",
    industry: "",
    price: "",
    wtp: "",
    totalTrust: "",
    iet: "",
  });

  const [result, setResult] = useState<QuickResult | null>(null);

  const onChange =
    (field: keyof QuickCheckInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      // Campos numéricos controlados
      if (["price", "wtp", "totalTrust", "iet"].includes(field)) {
        const asNum = v === "" ? "" : Number(v);
        setInput((s) => ({ ...s, [field]: asNum }));
      } else {
        setInput((s) => ({ ...s, [field]: v }));
      }
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = typeof input.price === "number" ? input.price : 0;
    const wtp = typeof input.wtp === "number" ? input.wtp : 0;
    const totalTrust =
      typeof input.totalTrust === "number" ? input.totalTrust : 0;
    const iet = typeof input.iet === "number" ? input.iet : 0;

    const gap = Number((wtp - price).toFixed(2));

    // Heurística simple de nivel de pirámide en base a totalTrust e IET
    let pyramidLevel: QuickResult["pyramidLevel"] = "Low";
    if (totalTrust >= 70 && iet >= 65) pyramidLevel = "High";
    else if (totalTrust >= 40 && iet >= 35) pyramidLevel = "Mid";

    const trustMsg =
      pyramidLevel === "High"
        ? "High trust: keep compounding evidence and scale challenges."
        : pyramidLevel === "Mid"
        ? "Mid trust: prioritize credibility gaps via targeted challenges."
        : "Low trust: start with foundational coherence (IET) and quick wins.";

    setResult({ gap, pyramidLevel, trustMsg });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">
        Quick TRU-e check
      </h1>
      <p className="mt-2 text-slate-700">
        Enter a few values to estimate your{" "}
        <strong>Trust level</strong>, the <strong>WTP↔Price gap</strong> and a
        quick guidance. This is motivational only — run the full TRU-e
        onboarding to get a complete diagnostic.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="brand">
            Brand / Organization
          </label>
          <input
            id="brand"
            value={input.brand}
            onChange={onChange("brand")}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            placeholder="Acme Corp"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800" htmlFor="industry">
            Industry (optional)
          </label>
          <input
            id="industry"
            value={input.industry}
            onChange={onChange("industry")}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            placeholder="Agri, Health, Energy..."
          />
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="price">
              Current Price (avg)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={input.price}
              onChange={onChange("price")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              placeholder="e.g. 12.90"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="wtp">
              WTP — Willingness To Pay (avg)
            </label>
            <input
              id="wtp"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={input.wtp}
              onChange={onChange("wtp")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              placeholder="e.g. 14.50"
            />
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="trust">
              Total Trust (0–100)
            </label>
            <input
              id="trust"
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={input.totalTrust}
              onChange={onChange("totalTrust")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              placeholder="e.g. 62"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-800" htmlFor="iet">
              IET / Coherence (0–100)
            </label>
            <input
              id="iet"
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={input.iet}
              onChange={onChange("iet")}
              className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              placeholder="e.g. 55"
            />
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600">
            Calculate
          </button>
          <button
            type="button"
            onClick={() => { setResult(null); setInput({ brand: "", industry: "", price: "", wtp: "", totalTrust: "", iet: "" }); }}
            className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Results</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <Stat label="WTP↔Price Gap" value={`${result.gap.toFixed(2)}`} hint="(WTP - Price)" />
            <Stat label="Pyramid Level" value={result.pyramidLevel} />
            <Stat label="Guidance" value={result.trustMsg} />
          </div>
        </section>
      )}
    </main>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-xl font-semibold text-slate-900">{value}</div>
      {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
    </div>
  );
}
