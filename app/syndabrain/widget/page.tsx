"use client";
import { useState } from "react";

export default function SyndabrainWidgetPage() {
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<Array<{role: string; content: string}>>([]);

  async function send() {
    if (!msg.trim()) return;
    const userMsg = { role: "user", content: msg };
    setLog((l) => [...l, userMsg]);
    setMsg("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const ct = res.headers.get("content-type") || "";
      let botText = "";
      if (ct.includes("application/json")) {
        const j = await res.json();
        botText = typeof j === "string" ? j : JSON.stringify(j, null, 2);
      } else {
        botText = await res.text();
      }
      setLog((l) => [...l, { role: "assistant", content: botText }]);
    } catch (e: any) {
      setLog((l) => [...l, { role: "assistant", content: `Error: ${e?.message || e}` }]);
    }
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"12px",gap:12}}>
      <div style={{fontWeight:600}}>SYNDA Chat (widget interno)</div>
      <div style={{flex:1,overflow:"auto",border:"1px solid #e5e7eb",borderRadius:8,padding:12,background:"white"}}>
        {log.map((m, i) => (
          <div key={i} style={{marginBottom:8}}>
            <b>{m.role === "user" ? "Tú" : "SyndaBrain"}:</b> <pre style={{display:"inline",whiteSpace:"pre-wrap"}}>{m.content}</pre>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8}}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Escribe tu mensaje…"
          style={{flex:1,border:"1px solid #e5e7eb",borderRadius:8,padding:"10px"}}
        />
        <button onClick={send} style={{border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 14px",background:"#0b5cff",color:"#fff"}}>
          Enviar
        </button>
      </div>
    </div>
  );
}
