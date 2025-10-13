"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };

export default function SyndabrainWidgetPage() {
  const [msg, setMsg] = useState<string>("");
  const [log, setLog] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const canSend = useMemo(() => msg.trim().length > 0 && !sending, [msg, sending]);

  const readBodyAsText = async (res: Response): Promise<string> => {
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      try {
        const j = (await res.json()) as unknown;
        // si la API devuelve {reply: "..."} o un string plano:
        if (typeof j === "string") return j;
        if (j && typeof j === "object" && "reply" in (j as Record<string, unknown>)) {
          const maybe = (j as Record<string, unknown>)["reply"];
          if (typeof maybe === "string") return maybe;
        }
        return JSON.stringify(j, null, 2);
      } catch {
        // si el JSON está malformado, cae a texto
        return res.text();
      }
    }
    return res.text();
  };

  const send = useCallback(async () => {
    if (!msg.trim() || sending) return;

    const text = msg;
    const userMsg: ChatMessage = { role: "user", content: text };
    setLog((l) => [...l, userMsg]);
    setMsg("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const bodyText = await readBodyAsText(res);
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: res.ok ? bodyText : `Error ${res.status}: ${bodyText}`,
      };
      setLog((l) => [...l, assistantMsg]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
      setLog((l) => [...l, { role: "assistant", content: `Error: ${msg}` }]);
    } finally {
      setSending(false);
      // devolver el foco al input para seguir chateando
      inputRef.current?.focus();
    }
  }, [msg, sending]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter para enviar, Ctrl/Cmd+Enter para salto de línea
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      void send();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setMsg((m) => m + "\n");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 12,
        gap: 12,
      }}
    >
      <div style={{ fontWeight: 600 }}>SYNDA Chat (widget interno)</div>

      <div
        style={{
          flex: 1,
          overflow: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 12,
          background: "white",
        }}
      >
        {log.map((m, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <b>{m.role === "user" ? "Tú" : "SyndaBrain"}:</b>{" "}
            <pre style={{ display: "inline", whiteSpace: "pre-wrap", margin: 0 }}>{m.content}</pre>
          </div>
        ))}
        {log.length === 0 && (
          <div style={{ color: "#6b7280" }}>Envía tu primer mensaje para comenzar…</div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <textarea
          ref={inputRef}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Escribe tu mensaje… (Enter para enviar, Ctrl/Cmd+Enter para nueva línea)"
          rows={2}
          style={{
            flex: 1,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 10,
            resize: "vertical",
            minHeight: 42,
          }}
        />
        <button
          onClick={() => void send()}
          disabled={!canSend}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "10px 14px",
            background: canSend ? "#0b5cff" : "#93c5fd",
            color: "#fff",
            cursor: canSend ? "pointer" : "not-allowed",
          }}
          aria-busy={sending}
        >
          {sending ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </div>
  );
}
