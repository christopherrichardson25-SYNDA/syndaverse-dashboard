"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LinkItem = { id: string; label: string };

const LINKS: LinkItem[] = [
  { id: "what",        label: "What we do" },
  { id: "how",         label: "How we do it" },
  { id: "calculator",  label: "TRU-e calculator" },
  { id: "who",         label: "Who we are" },
  { id: "syndatools",  label: "Syndatools" },
  { id: "privacy",     label: "Privacy Policy" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("what");

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <a href="#what" className="flex items-center gap-2" aria-label="Ir al inicio">
          <Image
            src="/synda-logo.png"
            alt="SYNDA"
            width={112}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={[
                "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition",
                active === l.id
                  ? "border-blue-600 text-blue-700"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:contact@syndaverse.com"
            className="ml-2 inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
          >
            LET’S CHAT
          </a>
        </div>

        {/* Mobile: burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-16 z-50 max-h-[80vh] overflow-auto rounded-b-2xl border-b border-slate-200 bg-white p-4 shadow-xl">
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={[
                      "block rounded-xl border px-4 py-3 text-base font-medium",
                      active === l.id
                        ? "border-blue-600 text-blue-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a
                href="mailto:contact@syndaverse.com"
                className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-500"
              >
                LET’S CHAT
              </a>
            </div>
            <button
              className="mt-3 w-full text-center text-sm text-slate-500 underline"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
