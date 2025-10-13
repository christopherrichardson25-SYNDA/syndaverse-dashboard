"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  /** Abre el modal de chat. Si no viene, se redirige al widget interno. */
  onOpenChat?: () => void;
};

export default function NavHeader({ onOpenChat }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/synda-logo.png"
                alt="SYNDΛverse"
                width={28}
                height={28}
                priority
              />
              <span className="hidden sm:inline font-semibold tracking-wide">
                SYNDΛverse
              </span>
            </Link>
          </div>

          {/* Links (desktop) */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <Link href="/#what-we-do" className="hover:text-slate-900">
              What we do
            </Link>
            <Link href="/#how-we-do-it" className="hover:text-slate-900">
              How we do it
            </Link>
            <Link href="/syndatools" className="hover:text-slate-900">
              Syndatools
            </Link>
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy Policy
            </Link>

            {/* CTA */}
            {onOpenChat ? (
              <button
                onClick={onOpenChat}
                className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                Let’s Chat
              </button>
            ) : (
              <Link
                href="/syndabrain/widget"
                className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                Let’s Chat
              </Link>
            )}
          </div>

          {/* Botón menú (mobile) */}
          <button
            className="md:hidden inline-flex items-center rounded-md border px-3 py-2 text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Menú mobile */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col gap-2 text-slate-700">
              <Link href="/#what-we-do" onClick={() => setOpen(false)}>
                What we do
              </Link>
              <Link href="/#how-we-do-it" onClick={() => setOpen(false)}>
                How we do it
              </Link>
              <Link href="/syndatools" onClick={() => setOpen(false)}>
                Syndatools
              </Link>
              <Link href="/privacy" onClick={() => setOpen(false)}>
                Privacy Policy
              </Link>

              {onOpenChat ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    onOpenChat();
                  }}
                  className="mt-1 rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                >
                  Let’s Chat
                </button>
              ) : (
                <Link
                  href="/syndabrain/widget"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 text-center"
                >
                  Let’s Chat
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
