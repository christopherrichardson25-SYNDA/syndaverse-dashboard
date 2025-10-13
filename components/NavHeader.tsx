"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  onOpenChat?: () => void;
};

export default function NavHeader({ onOpenChat }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
        {/* LOGO solo imagen (sin texto) */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Image
            src="/synda-logo.png"
            alt="SYNDA"
            width={70}
            height={18}
            priority
          />
        </Link>

        {/* Menú desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <li><a href="#what-we-do" className="hover:text-slate-900">What we do</a></li>
          <li><a href="#how-we-do-it" className="hover:text-slate-900">How we do it</a></li>
          <li><a href="#syndatools" className="hover:text-slate-900">Syndatools</a></li>
          <li><a href="#privacy-policy" className="hover:text-slate-900">Privacy Policy</a></li>
          <li>
            <button
              onClick={onOpenChat}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
            >
              Let’s Chat
            </button>
          </li>
        </ul>

        {/* Menú móvil */}
        <button
          className="md:hidden inline-flex items-center rounded-md border px-3 py-2 text-slate-700"
          onClick={() => setOpened(v => !v)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Drawer móvil */}
      {opened && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <ul className="mx-auto max-w-6xl px-4 py-3 space-y-2 text-slate-700">
            <li><a href="#what-we-do" onClick={() => setOpened(false)}>What we do</a></li>
            <li><a href="#how-we-do-it" onClick={() => setOpened(false)}>How we do it</a></li>
            <li><a href="#syndatools" onClick={() => setOpened(false)}>Syndatools</a></li>
            <li><a href="#privacy-policy" onClick={() => setOpened(false)}>Privacy Policy</a></li>
            <li>
              <button
                onClick={() => { setOpened(false); onOpenChat?.(); }}
                className="mt-2 w-full rounded-md bg-blue-600 px-3 py-2 text-white"
              >
                Let’s Chat
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
