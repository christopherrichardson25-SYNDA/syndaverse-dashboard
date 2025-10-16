// lib/syndabrain.ts
export type ChatContext = Record<string, unknown>;

export type ChatResponse = {
  reply: string;
  model: string;
  app?: string | null;
  ethics?: Record<string, unknown> | null;
};

export async function sendChat(
  message: string,
  context: ChatContext = {}
): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message, context }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstream error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as ChatResponse;
}
