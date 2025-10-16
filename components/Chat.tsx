"use client";
import { useState } from "react";
import { askSynda } from "@/lib/syndabrain";

export default function Chat() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{role:"user"|"assistant", content:string}[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMsgs(m => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await askSynda(userMsg, "SyndaTools", 5);
      setMsgs(m => [...m, { role: "assistant", content: res.reply }]);
    } catch (err:any) {
      setMsgs(m => [...m, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-2xl mx-auto">
      <div className="border rounded p-3 h-80 overflow-auto bg-white">
        {msgs.map((m,i) => (
          <div key={i} className={m.role==="user" ? "text-right" : ""}>
            <pre className="whitespace-pre-wrap">{m.content}</pre>
          </div>
        ))}
        {loading && <div className="opacity-60">pensando…</div>}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Escribe tu mensaje…"
        />
        <button className="border rounded px-3" type="submit">Enviar</button>
      </form>
    </div>
  );
}
