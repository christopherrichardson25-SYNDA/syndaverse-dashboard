"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PageContextValue = string | number | boolean | null | undefined;

type Props = {
  open: boolean;
  onClose: () => void;
  userId?: string | null;
  userEmail?: string | null;
  pageContext?: Record<string, PageContextValue>;
};

type ChatMsg = { who: "me" | "bot"; text: string; meta?: string };

type Ethics = {
  label?: string;
  state?: string;
  allowed?: boolean;
  score?: number;
  mitigations?: string[];
};

type ApiInner = {
  ethics?: Ethics;
  reply?: string;
  result?: unknown[];
  state?: string;
};

type ApiReply = {
  data?: ApiInner;
  ethics?: Ethics;
  reply?: string;
  result?: unknown[];
  state?: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function asNumber(v: unknown): number | undefined {
  return typeof v === "number" ? v : undefined;
}
function asString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}
function asStringArray(v: unknown): string[] | undefined {
  return Array.isArray(v) && v.every((x) => typeof x === "string")
    ? (v as string[])
    : undefined;
}

function readEthics(v: unknown): Ethics | undefined {
  if (!isRecord(v)) return undefined;
  const e: Ethics = {};
  if (typeof v.label === "string") e.label = v.label;
  if (typeof v.state === "string") e.state = v.state;
  if (typeof v.allowed === "boolean") e.allowed = v.allowed;
  if (typeof v.score === "number") e.score = v.score;
  if (Array.isArray(v.mitigations) && v.mitigations.every((x) => typeof x === "string")) {
    e.mitigations = v.mitigations as string[];
  }
  return e;
}

function readApiInner(v: unknown): ApiInner | undefined {
  if (!isRecord(v)) return undefined;
  const inner: ApiInner = {};
  const ethics = readEthics(v.ethics);
  if (ethics) inner.ethics = ethics;
  const reply = asString(v.reply);
  if (reply) inner.reply = reply;
  if (Array.isArray(v.result)) inner.result = v.result as unknown[];
  const state = asString(v.state);
  if (state) inner.state = state;
  return inner;
}

function readApiReply(v: unknown): ApiReply {
  const out: ApiReply = {};
  if (!isRecord(v)) return out;
  const inner = readApiInner(v.data);
  if (inner) out.data = inner;
  const ethics = readEthics(v.ethics);
  if (ethics) out.ethics = ethics;
  const reply = asString(v.reply);
  if (reply) out.reply = reply;
  if (Array.isArray(v.result)) out.result = v.result as unknown[];
  const state = asString(v.state);
  if (state) out.state = state;
  return out;
}

function errToMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

export default function SyndabrainModal({
  open,
  onClose,
  userId,
  userEmail,
  pageContext = {},
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // UI state
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      who: "bot",
      text:
        "Hi! I’m the resonant brain. Send a message and I’ll evaluate its ethical impact before replying.",
      meta: "Tip: adjust the impact sliders below.",
    },
  ]);
  const [pending, setPending] = useState(false);
  const [q, setQ] = useState("");

  // Impact sliders
  const [human, setHuman] = useState(0.8);
  const [biodiversity, setBiodiversity] = useState(0.8);
  const [society, setSociety] = useState(0.75);
  const [energy, setEnergy] = useState(0.7);

  // Open/close <dialog>
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setTimeout(() => inputRef.current?.focus(), 10);
    }
    if (!open && d.open) d.close();
  }, [open]);

  // ESC cierra
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  // Scroll al final al actualizar mensajes
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Backdrop click
  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const d = dialogRef.current!;
    const r = d.getBoundingClientRect();
    const inside =
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    if (!inside) onClose();
  };

  // Normaliza contexto
  const normalizedContext = useMemo(() => {
    const out: Record<string, string> = {};
    Object.entries(pageContext).forEach(([k, v]) => (out[k] = v == null ? "" : String(v)));
    return out;
  }, [pageContext]);

  // Llamada al API Route que reenvía a SYNDABRAIN_API_URL
  async function send() {
    const text = q.trim();
    if (!text || pending) return;
    setQ("");
    setPending(true);
    setMessages((m) => [...m, { who: "me", text }]);

    try {
      const res = await fetch("/api/syndabrain/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          impact: { human, biodiversity, society, energy },
          user: { id: userId ?? "", email: userEmail ?? "" },
          context: normalizedContext,
        }),
      });

      const raw = (await res.json().catch(() => ({}))) as unknown;
      const data = readApiReply(raw);

      const ethics = data.data?.ethics ?? data.ethics ?? {};
      const label =
        ethics.label ??
        ethics.state ??
        (ethics.allowed === false ? "BLOCKED" : "HARMONIC");
      const score =
        typeof ethics.score === "number" ? ethics.score.toFixed(2) : undefined;

      const mitig =
        ethics.mitigations && ethics.mitigations.length
          ? ` • Mitigations: ${ethics.mitigations.join(", ")}`
          : "";

      const state =
        (Array.isArray(data.data?.result) && data.data?.result?.[0]) ??
        (Array.isArray(data.result) && data.result?.[0]) ??
        data.state ??
        "";

      const metaParts: string[] = [];
      if (label) metaParts.push(`Ethics: ${label}${score ? ` (score: ${score})` : ""}`);
      if (mitig) metaParts.push(mitig.trim());
      if (state) metaParts.push(`Brain state: ${String(state)}`);

      const meta = metaParts.length ? metaParts.join(" • ") : undefined;

      const botText =
        data.data?.reply ??
        data.reply ??
        "Processed. (No textual reply provided by backend)";

      setMessages((m) => [...m, { who: "bot", text: botText, meta }]);
    } catch (err: unknown) {
      setMessages((m) => [
        ...m,
        { who: "bot", text: `Error: ${errToMessage(err)}` },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="s-modal"
      onMouseDown={onBackdropClick}
      aria-labelledby="syndabrain-title"
    >
      <div className="s-card">
        <header className="s-header">
          <div className="s-head-left">
            <span className="s-dot" />
            <h2 id="syndabrain-title" className="s-title">
              SYNDA Chat
            </h2>
          </div>
          <button className="s-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        {/* Mensajes */}
        <div ref={bodyRef} className="s-body">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.who}`}>
              <div>{m.text}</div>
              {m.meta && <div className="meta">{m.meta}</div>}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="s-foot">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your message..."
          />
          <button onClick={send} disabled={pending}>
            {pending ? "Sending…" : "Send"}
          </button>
        </div>

        {/* Sliders de impacto */}
        <div className="s-foot grid">
          <div>
            <label>
              Human <small>{human.toFixed(2)}</small>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={human}
              onChange={(e) => setHuman(Number(e.target.value))}
            />
          </div>
          <div>
            <label>
              Biodiversity <small>{biodiversity.toFixed(2)}</small>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={biodiversity}
              onChange={(e) => setBiodiversity(Number(e.target.value))}
            />
          </div>
          <div>
            <label>
              Society <small>{society.toFixed(2)}</small>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={society}
              onChange={(e) => setSociety(Number(e.target.value))}
            />
          </div>
          <div>
            <label>
              Energy <small>{energy.toFixed(2)}</small>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .s-modal { padding: 0; border: none; background: transparent; }
        .s-modal::backdrop { backdrop-filter: blur(4px); background: rgba(0,0,0,.35); }

        .s-card {
          width: min(960px, 95vw);
          height: min(84vh, 860px);
          background: #fff; border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,.15);
          display: flex; flex-direction: column; overflow: hidden;
        }

        .s-header {
          display:flex; align-items:center; justify-content:space-between;
          padding: 10px 12px; border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }
        .s-head-left { display:flex; gap:10px; align-items:center; }
        .s-dot { width:10px; height:10px; border-radius:50%; background:#10b981; box-shadow:0 0 10px #10b981; }
        .s-title { margin:0; font-size: 1rem; font-weight: 700; letter-spacing:.2px; }

        .s-close {
          border: 1px solid #e5e7eb; border-radius: 10px; padding: 6px 10px;
          background: #ffffff; cursor: pointer;
        }

        .s-body {
          padding: 14px 16px; display:flex; flex-direction:column; gap:12px;
          height: 100%; overflow:auto; background:#fbfbfc;
        }
        .msg { max-width:75%; padding:10px 12px; border-radius:12px; line-height:1.35; }
        .msg.me { align-self:flex-end; background:#e6f4ff; border-color:#bfdbfe; border:1px solid #bfdbfe; }
        .msg.bot { align-self:flex-start; background:#f3f4f6; border:1px solid #e5e7eb; }
        .meta { font-size:12px; opacity:.8; margin-top:4px; }

        .s-foot {
          display:flex; gap:10px; border-top:1px solid #e5e7eb; padding:12px; background:#fff;
        }
        .s-foot.grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
        input[type="text"], input[type="range"], input {
          border-radius:10px; border:1px solid #d1d5db; background:#fff; color:#111827;
        }
        input[type="text"] { padding:12px; flex:1; outline:none; }
        button { padding:12px 14px; cursor:pointer; border-radius:10px; border:1px solid #10b981; background:#10b981; color:#fff; }
        button[disabled] { opacity:.6; cursor:not-allowed; }

        @media (prefers-color-scheme: dark) {
          .s-card { background:#0b0f14; color:#e5e7eb; }
          .s-header { border-color:#1f2937; background:#0f141a; }
          .s-close { background:#0f141a; border-color:#1f2937; color:#e5e7eb; }
          .s-body { background:#0a0f14; }
          .msg.me { background:#0e2235; border-color:#17324a; }
          .msg.bot { background:#0f141a; border-color:#1f2937; }
          input[type="text"] { background:#0f141a; color:#e5e7eb; border-color:#1f2937; }
          input[type="range"] { background:transparent; }
          button { background:#10b981; border-color:#10b981; }
        }
      `}</style>
    </dialog>
  );
}
