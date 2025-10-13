"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SyndabrainModal from "./SyndabrainModal";

export default function NavHeader() {
  const [openChat, setOpenChat] = useState(false);

  // Si quieres forzar el widget interno siempre,
  // asegúrate que NEXT_PUBLIC_SYNDABRAIN_URL="/syndabrain" en .env.local
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-slate-200 dark:bg-[#0B0F19]/90 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SYNDΛverse"
              width={28}
              height={28}
              priority
            />
            <span className="font-semibold tracking-tight hidden sm:block">
              SYNDΛverse
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#what-we-do" className="hover:opacity-80">
              What we do
            </Link>
            <Link href="/#how-we-do-it" className="hover:opacity-80">
              How we do it
            </Link>
            <Link href="/#syndatools" className="hover:opacity-80">
              Syndatools
            </Link>
            <Link href="/privacy" className="hover:opacity-80">
              Privacy Policy
            </Link>

            {/* CTA */}
            <button
              onClick={() => setOpenChat(true)}
              className="rounded-lg border px-3 py-2 bg-[#0B5CFF] text-white hover:opacity-90"
            >
              Let&apos;s Chat
            </button>
          </nav>

          {/* En móviles: solo botón Chat, los links pueden ir en un menú si luego quieres */}
          <button
            onClick={() => setOpenChat(true)}
            className="md:hidden rounded-lg border px-3 py-2 bg-[#0B5CFF] text-white hover:opacity-90"
            aria-label="Open chat"
          >
            Chat
          </button>
        </div>
      </header>

      {/* Modal del chat */}
      <SyndabrainModal
        open={openChat}
        onClose={() => setOpenChat(false)}
        // Opcional: pasa userId / userEmail si los tienes
        pageContext={{ from: "header", page: "home" }}
      />
    </>
  );
}

