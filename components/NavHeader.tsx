// components/NavHeader.tsx (ejemplo)
"use client";
import { useState } from "react";
import SyndabrainModal from "./SyndabrainModal";

export default function NavHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header>
        <button onClick={() => setOpen(true)}>Let’s Chat</button>
      </header>
      <SyndabrainModal
        open={open}
        onClose={() => setOpen(false)}
        userId={null}
        userEmail={null}
        pageContext={{ source: "navbar" }}
      />
    </>
  );
}
