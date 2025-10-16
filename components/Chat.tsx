// components/Chat.tsx
"use client";

import { useState } from "react";
import { sendChat, type ChatResponse } from "@/lib/syndabrain";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const onSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");

    try {
      const resp: ChatResponse = await sendChat(text, { app: "core" });
      setMessages((m) => [...m, { role: "assistant", content: resp.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Error: ${msg}` },
      ]);
    }
  };

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
        {messages.map((m, idx) => (
          <div key={idx}>
            <b>{m.role === "user" ? "Tú" : "SyndaBrain"}:</b> {m.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Escribe tu mensaje…"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={onSend}>Enviar</button>
      </div>
    </div>
  );
}
