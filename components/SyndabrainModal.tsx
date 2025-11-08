// components/SyndabrainModal.tsx
"use client";
import { useEffect, useRef } from "react";

type PageContextValue = string | number | boolean | null | undefined;

type Props = {
  open: boolean;
  onClose: () => void;
  userId?: string | null;
  userEmail?: string | null;
  pageContext?: Record<string, PageContextValue>;
};

export default function SyndabrainModal({
  open,
  onClose,
  userId,
  userEmail,
  pageContext = {},
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => { e.preventDefault(); onClose(); };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [onClose]);

  // Normaliza pageContext -> string para URLSearchParams
  const normalizedEntries: [string, string][] = Object.entries(pageContext).map(
    ([k, v]) => [k, v == null ? "" : String(v)]
  );

  const base =
  process.env.NEXT_PUBLIC_SYNDABRAIN_URL ??
  "https://tru-e-synda-brain.onrender.com/syndabrain/widget";
  const qs = new URLSearchParams({
    uid: userId ?? "",
    email: userEmail ?? "",
    lang: typeof window !== "undefined" ? (navigator.language || "en") : "en",
    ...Object.fromEntries(normalizedEntries),
  }).toString();

  const src = `${base}?${qs}`;

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const d = dialogRef.current!;
    const r = d.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) onClose();
  };

  return (
    <dialog ref={dialogRef} className="s-modal" onMouseDown={onBackdropClick} aria-labelledby="syndabrain-title">
      <div className="s-card">
        <header className="s-header">
          <h2 id="syndabrain-title" className="s-title">SYNDA Chat</h2>
          <button className="s-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <iframe src={src} title="Syndabrain" className="s-iframe" allow="clipboard-write; microphone; camera" />
      </div>

      <style jsx>{`
        .s-modal { padding:0; border:none; background:transparent; }
        .s-modal::backdrop { backdrop-filter: blur(4px); background: rgba(0,0,0,.35); }
        .s-card { width:min(960px,95vw); height:min(80vh,820px); background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,.15); display:flex; flex-direction:column; overflow:hidden; }
        .s-header { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-bottom:1px solid #e5e7eb; }
        .s-title { margin:0; font-size:1rem; font-weight:600; }
        .s-close { border:1px solid #e5e7eb; border-radius:10px; padding:6px 10px; background:#f9fafb; cursor:pointer; }
        .s-iframe { flex:1; width:100%; border:0; }
        @media (prefers-color-scheme: dark) {
          .s-card { background:#0b0f14; color:#e5e7eb; }
          .s-header { border-color:#1f2937; }
          .s-close { background:#0f141a; border-color:#1f2937; color:#e5e7eb; }
        }
      `}</style>
    </dialog>
  );
}
