// components/NavHeader.tsx
"use client";
import { useState } from "react";
import SyndabrainModal from "./SyndabrainModal";

export default function NavHeader() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-4">
        {/* …tu nav/logo/links… */}
        <button
          className="rounded-xl px-4 py-2 bg-indigo-600 text-white"
          onClick={() => setOpenChat(true)}
        >
          Let’s Chat
        </button>
      </header>

      <SyndabrainModal open={openChat} onClose={() => setOpenChat(false)} />
    </>
  );
}
