"use client";
import { useState } from "react";

export default function LetsChatPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_API}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        context: { app: "SyndaTools", k: 5 },
      }),
    });
    const data = await res.json();
    setResponse(data.reply || "Sin respuesta");
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">💬 Let's Chat (SyndaBrain)</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={sendMessage}
      >
        Enviar
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <strong>🧠 SyndaBrain:</strong>
          <p>{response}</p>
        </div>
      )}
    </main>
  );
}
