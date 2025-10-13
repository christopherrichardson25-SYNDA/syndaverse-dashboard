"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  onOpenChat: () => void;
};

export default function NavHeader({ onOpenChat }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/60 dark:bg-[#0B0F19]/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Si no tienes /logo.svg, queda el texto como fallback */}
          <div className="relative h-7 w-7">
            {/* descomenta si tienes el asset
            <Image src="/logo.svg" alt="SYNDΛverse" fill />
            */}
            <span className="inline-block h-7 w-7 rounded bg-indigo-600 text-center text-sm font-bold leading-7 text-white">
              Λ
            </span>
          </div>
          <span className="text-base font-semibold tracking-wide">
            SYNDΛverse
          </span>
        </Link>

        {/* RIGHT: Navigation */}
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/quick-check"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Quick Check
          </Link>

          {/* Ejemplos adicionales (opcional) */}
          <a
            href="https://syndaverse.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Site
          </a>

          {/* CTA: Let's Chat */}
          <button
            onClick={onOpenChat}
            className="rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Let’s Chat
          </button>
        </nav>
      </div>
    </header>
  );
}
