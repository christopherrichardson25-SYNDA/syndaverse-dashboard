"use client";

import { useState } from "react";

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

export default function LetsChatPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setLoading(true);
    setError("");
    setResponse("");

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
      setResponse(data.reply || "Sin respuesta");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💬 Let&apos;s Chat (SyndaBrain)</h1>

      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      <div className="flex items-center gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
        <span className="text-sm text-gray-500">
          Tip: Ctrl/Cmd+Enter para enviar
        </span>
      </div>

      {error && (
        <div className="p-3 border rounded bg-red-50 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && !error && (
        <div className="mt-2 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <strong>🧠 SyndaBrain:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </main>
  );
}
