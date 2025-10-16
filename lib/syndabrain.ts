export type BrainReply = {
  reply: string;
  model: string;
  app?: string;
  ethics?: any;
};

export async function askSynda(message: string, app = "SyndaTools", k = 5) {
  const url = `${process.env.NEXT_PUBLIC_BRAIN_URL}/api/chat`;
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message, context: { app, k } }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SyndaBrain error ${res.status}: ${text}`);
  }
  return (await res.json()) as BrainReply;
}
