"use client";

import { useState, type ChangeEvent, type KeyboardEvent } from "react";

type Role = "user" | "assistant";

type Msg = {
  role: Role;
  content: string;
};

type ChatPayload = {
  message: string;
  userId?: string | null;
  context?: Record<string, unknown>;
};

type ChatResponse = {
  reply: string;
  model: string;
  app?: string | null;
  ethics?: Record<string, unknown> | null;
};

export default function Chat() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setError("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    const payload: ChatPayload = {
      message: text,
      context: { app: "SyndaTools", k: 5 },
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Upstream error ${res.status}`);
      }

      const data = (await res.json()) as ChatResponse;
      const reply: string = data.reply || "Sin respuesta";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded border ${
              m.role === "user" ? "bg-white" : "bg-gray-50"
            }`}
          >
            <strong>{m.role === "user" ? "Tú" : "SyndaBrain"}:</strong>{" "}
            <span className="whitespace-pre-wrap">{m.content}</span>
          </div>
        ))}
        {error && (
          <div className="p-3 rounded border bg-red-50 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Escribe tu mensaje… (Ctrl/Cmd+Enter para enviar)"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={() => void send()}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}
