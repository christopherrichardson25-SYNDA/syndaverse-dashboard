// app/quick-check/page.tsx
"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_TRUE_API ?? "https://tru-e-calculator-1.onrender.com";

export default function QuickCheck() {
  const [used, setUsed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    brand: "", industry: "_generic",
    sla: 70, complaints_rate: 30, productivity_per_labor_hour: 60, caov: 55,
    esg: 58, governance: 62, nps: 10, satisfaction: 72, digital_rep: 65,
    brand_promise: 70, brand_perception: 66, wtp_premium_pct: 0,
  });

  // 1 uso por navegador
  useEffect(() => {
    if (localStorage.getItem("truq_used") === "1") setUsed(true);
  }, []);

  async function onCalc() {
    if (used) return;
    const payload = {
      industry: form.industry, brand: form.brand || "Marca",
      weights_mode: "auto_heuristic",
      data: {
        sla:+form.sla, complaints_rate:+form.complaints_rate, productivity_per_labor_hour:+form.productivity_per_labor_hour,
        caov:+form.caov, esg:+form.esg, governance:+form.governance,
        nps:+form.nps, satisfaction:+form.satisfaction, digital_rep:+form.digital_rep,
        brand_promise:+form.brand_promise, brand_perception:+form.brand_perception,
        wtp_premium_pct:+form.wtp_premium_pct,
      },
    };
    const r = await fetch(`${API}/score`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
    const json = await r.json();
    setResult(json);
    localStorage.setItem("truq_used","1"); // marca como usado
    setUsed(true);
  }

  async function onSaveLead() {
    if (!email) return;
    setSaving(true);
    await fetch(`${API}/lead`, {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, brand: form.brand, industry: form.industry, snapshot: result })
    });
    setSaving(false);
    alert("¡Gracias! Te contactaremos para integrar SYNDA.");
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Quick TRU-e check</h1>
      <p className="text-slate-600">Un cálculo gratuito para conocer el nivel de confianza de tu marca.</p>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {["brand","industry","sla","complaints_rate","productivity_per_labor_hour","caov","esg","governance","nps","satisfaction","digital_rep","brand_promise","brand_perception"].map((k:any)=>(
          <input key={k} className="input" type={["nps","brand","industry"].includes(k)?"text":"number"}
            placeholder={k} value={(form as any)[k]}
            onChange={e=>setForm({...form, [k]: (["brand","industry"].includes(k)? e.target.value : +e.target.value)})}/>
        ))}
      </div>

      <button onClick={onCalc} disabled={used} className="btn mt-4">
        {used ? "Ya utilizaste tu quick check" : "Calcular"}
      </button>

      {result && (
        <div className="mt-6 select-none" onContextMenu={(e)=>e.preventDefault()}>
          <Boxes r={result} />
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border">
            <p className="text-sm text-slate-600">¿Recibir el informe y recomendaciones? Deja tu correo corporativo.</p>
            <div className="flex gap-2 mt-2">
              <input type="email" placeholder="tu@empresa.com" value={email}
                     onChange={e=>setEmail(e.target.value)} className="input flex-1" />
              <button onClick={onSaveLead} className="btn" disabled={saving}>{saving?"Guardando…":"Guardar"}</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .input{border:1px solid #e5e7eb; padding:10px; border-radius:12px}
        .btn{background:#0B2742; color:#fff; padding:10px 14px; border-radius:12px}
        .select-none{-webkit-user-select:none; user-select:none}
      `}</style>
    </main>
  );
}

function Boxes({ r }: { r:any }) {
  // cajas no copiables: pintamos valores en <canvas>
  const items = [
    ["IET", Math.round(r.score_0_100)],
    ["Banda", r.label],
    ["Nivel", r.level],
    ["ATRU", Math.round(r.atru_0_100 ?? 0)],
  ];
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {items.map(([t,v]) => (
        <div key={t as string} className="rounded-2xl border p-4 bg-white shadow-sm">
          <div className="text-sm text-slate-500">{t}</div>
          <canvas width={220} height={60} aria-label={`${t}: ${v}`}
            ref={(el)=>{
              if(!el) return;
              const ctx = el.getContext('2d')!;
              ctx.clearRect(0,0,el.width,el.height);
              ctx.font = '700 36px Inter, system-ui, sans-serif';
              ctx.fillText(String(v), 10, 44);
            }}/>
        </div>
      ))}
    </div>
  );
}
