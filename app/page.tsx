'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

/**
 * Syndapsis — Landing page
 * - Hero with manifesto modal trigger ("Find out more")
 * - "The SYNDΛ Difference" 4-tile diagram with centered "+" and "= SYNDAPSIS"
 * - "How we do it" section using the SVG you uploaded to /public
 * - Clean Tailwind layout, no external component deps
 */

export default function Page() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm tracking-widest text-slate-500 uppercase">
              Challenge Platform
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
              We unite <span className="bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 to-violet-600">science, resonance, and community</span>{' '}
              to turn difference into superpower — transforming the invisible into creative force.
            </h1>

            <div className="mt-8 flex gap-3">
              <button
                onClick={openModal}
                className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-violet-600 shadow-lg shadow-violet-600/20 hover:opacity-95 focus:outline-none"
              >
                Find out more
              </button>
              <a
                href="#how"
                className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold border border-slate-200 hover:bg-slate-50"
              >
                How we do it
              </a>
            </div>
          </div>

          {/* Optional visual (brain/synapse mark placeholder area) */}
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200/80 p-6 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 520 390" aria-hidden="true">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* stylized brain outline */}
                <path
                  d="M140,210c-40-30-50-110,20-130c20-40,110-50,140-10c50-20,110,10,110,70c50,10,40,120-40,130c-10,30-40,50-80,40c-20,20-60,20-90-5c-30,10-60-5-60-35"
                  fill="none"
                  stroke="url(#g)"
                  strokeWidth="6"
                  opacity="0.8"
                  filter="url(#glow)"
                />
                {/* synapse nodes */}
                {[
                  [260,180],[210,140],[310,130],[360,180],[310,230],[210,230],[260,120]
                ].map(([x,y],i)=>(
                  <g key={i}>
                    <line x1="260" y1="180" x2={x} y2={y} stroke="url(#g)" strokeWidth="3" />
                    <circle cx={x} cy={y} r="7" fill="url(#g)" />
                  </g>
                ))}
                <circle cx="260" cy="180" r="10" fill="url(#g)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* The SYNDΛ Difference (4 tiles with center + and "= SYNDAPSIS") */}
      <section className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold">The SYNDΛ Difference</h2>
          <p className="mt-2 text-slate-600">Four pillars combining into a single operating system for challenges.</p>

          <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* tiles */}
            <Tile
              title="Science"
              body="Evidence, data standards, and measurable outcomes. No mysticism—just verifiable progress."
              icon={
                <AtomIcon />
              }
            />
            <Tile
              title="Resonance"
              body="Match problems with minds through cognitive fit and team coherence for creative breakthroughs."
              icon={<WaveIcon />}
            />
            <Tile
              title="Community"
              body="Anonymous avatars, mentoring, and shared XP. Talent thrives without social noise."
              icon={<UsersIcon />}
            />
            <Tile
              title="Merit"
              body="Transparent scoring and rewards. AHP-based evaluation aligned with what matters to the company."
              icon={<TrophyIcon />}
            />

            {/* Center plus */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-white text-3xl font-extrabold flex items-center justify-center select-none shadow-lg">
                +
              </div>
            </div>
          </div>

          {/* Equals SYNDAPSIS */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xl md:text-2xl font-extrabold">
            <span className="text-slate-400">=</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-violet-600">SYNDAPSIS</span>
          </div>
        </div>
      </section>

      {/* How we do it (SVG from /public) */}
      <section id="how" className="px-6 md:px-10 lg:px-16 py-12 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">How we do it</h2>
            <a href="#manifesto" className="text-sm font-semibold underline decoration-slate-300 hover:decoration-slate-500">
              Read manifesto
            </a>
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white">
            <Image
              src="/syndapsis_how_we_do_it.svg"
              alt="Syndapsis — How we do it (4 steps)"
              width={1200}
              height={520}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to post a challenge?</h3>
          <p className="mt-2 text-slate-600">Define your brief, criteria and prize. We’ll build the right team and deliver a scored shortlist.</p>
          <div className="mt-6">
            <a
              href="/challenge/new"
              className="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800"
            >
              Create Challenge
            </a>
          </div>
        </div>
      </section>

      {/* Manifesto Modal (native <dialog>) */}
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/40 rounded-2xl p-0 w-[min(720px,92vw)]"
        aria-labelledby="manifesto-title"
      >
        <div id="manifesto" className="bg-white rounded-2xl overflow-hidden">
          <div className="px-6 md:px-8 pt-6 pb-4">
            <h4 id="manifesto-title" className="text-xl md:text-2xl font-extrabold">
              SYNDA Manifesto
            </h4>
            <p className="mt-3 text-slate-700">
              We believe neurodivergences are sensitive antennas announcing the next stage of humanity. We unite science, resonance,
              and community to convert difference into superpower and transform the invisible into creative force. Our purpose:
              think differently to solve the impossible and guide a new human evolution.
            </p>

            <div className="mt-6 grid gap-4">
              <ManifestoPoint
                title="Biological base: DNA as an open system"
                bullets={[
                  'Gene expression responds to environment and context (epigenetics).',
                  'Neurodivergence expresses alternative cognitive strategies for the species.',
                  'Health, stress and electromagnetic environments modulate expression.'
                ]}
              />
              <ManifestoPoint
                title="Brain & resonance"
                bullets={[
                  'Cognition emerges from patterns and synchronization across networks.',
                  'Teams resonate when complementary profiles lock into a coherent problem frame.',
                  'We operationalize this with standardized briefs, data rooms and scored decisions.'
                ]}
              />
              <ManifestoPoint
                title="Merit & transparency"
                bullets={[
                  'AHP multi-criteria scoring aligned with company goals.',
                  'Anonymous avatars, mentorship, XP and audit trails to reward real outcomes.'
                ]}
              />
            </div>
          </div>

          <div className="px-6 md:px-8 py-4 bg-slate-50 flex items-center justify-end gap-3">
            <button
              onClick={closeModal}
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold border border-slate-200 hover:bg-white"
            >
              Close
            </button>
            <a
              href="#how"
              onClick={closeModal}
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800"
            >
              See the process
            </a>
          </div>
        </div>
      </dialog>
    </main>
  );
}

/* ---------- Small UI bits (no external libs) ---------- */

function Tile({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-100 to-violet-100 ring-1 ring-slate-200 flex items-center justify-center">
            <div className="w-6 h-6 text-violet-700">{icon}</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{body}</p>
        </div>
      </div>
    </div>
  );
}

function ManifestoPoint({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div>
      <h5 className="font-semibold">{title}</h5>
      <ul className="mt-2 list-disc pl-5 text-slate-700 text-sm space-y-1">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

/* Simple inline icons (no dependencies) */
function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function WaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M2 12c3 0 3-6 6-6s3 12 6 12 3-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 20c0-3.5 3-5.5 6-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 20c0-2.8 2.4-4.4 4.5-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12v3M8 21h8M6 8H5a3 3 0 0 1-3-3V4h4M18 8h1a3 3 0 0 0 3-3V4h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
