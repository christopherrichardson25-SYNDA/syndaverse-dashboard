"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "what", label: "What we do" },        // Agentes + Empresas (onboardings)
  { id: "how", label: "How we do it" },       // Syndapsis
  { id: "calculator", label: "TRU-e calculator" },
  { id: "who", label: "Who we are" },
  { id: "syndatools", label: "Syndatools" },
  { id: "privacy", label: "Privacy Policy" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("what");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const LinkItem = ({ id, label }: { id: string; label: string }) => (
    <a href={`#${id}`} onClick={() => setOpen(false)} className={`chip ${active === id ? "ring-focus" : ""}`}>
      {label}
    </a>
  );

  return (
   <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="container-syn h-14 flex items-center justify-between">
        <a href="#what" className="flex items-center gap-2">
          <span className="grid place-items-center w-7 h-7 rounded-md bg-gradient-to-br from-violet-600 to-cyan-500 font-extrabold">Λ</span>
          <strong>SYNDA</strong>
        </a>
        <div className="hidden md:flex gap-2">{LINKS.map((l) => <LinkItem key={l.id} {...l} />)}</div>
        <button onClick={() => setOpen(v => !v)} className="md:hidden chip" aria-label="Open menu">Menu</button>
      </nav>
      {open && (
        <div className="md:hidden glass border-t">
          <div className="container-syn py-4 flex flex-col gap-3">
            {LINKS.map((l) => <LinkItem key={l.id} {...l} />)}
            <a href="mailto:contact@syndaverse.com" className="btn btn-primary mt-2 self-start">LET’S CHAT</a>
          </div>
        </div>
      )}
    </header>
  );
}
