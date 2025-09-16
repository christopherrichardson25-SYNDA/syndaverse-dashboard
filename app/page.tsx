// app/page.tsx
"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

// Usa el que tengas:
import NavHeader from "../components/NavHeader";
// Si tu proyecto usa NavWhite en vez de NavHeader, cambia la línea anterior.

// Modal (EN)
import ManifestoModal from "../components/ManifestoModal";

const GH = "https://github.com/christopherrichardson25-SYNDA";
const REPOS = {
  onboardingEnterprise: `${GH}/onboarding-enterprises`,
  onboardingAgents: `${GH}/onboarding-agents`,
  truCalculator: `${GH}/tru-e-calculator`,
  syndapsis: `${GH}/syndapsis-platform`,
  syndatools: `${GH}/syndatools`,
};

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <>
      <NavHeader />

      {/* HERO: blue band + CTA (logo del header, no aquí) */}
      <section className="relative bg-gradient-to-r from-sky-700 to-blue-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Copy (EN) */}
            <div>
              <h1 className="mt-0 text-3xl font-bold leading-tight md:text-5xl">
                We make the invisible visible
              </h1>
              <p className="mt-4 text-white/90 md:text-lg">
                We unite <b>science</b>, <b>resonance</b>, and <b>community</b> to
                turn <b>difference</b> into a <b>superpower</b> and transform the
                invisible into a <b>creative force</b>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setManifestoOpen(true)}
                  className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
                >
                  Find out more
                </button>
                <a
                  href={REPOS.truCalculator}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 hover:bg-white/15"
                >
                  Try TRU-e calculator
                </a>
              </div>
            </div>

            {/* Right: bridge image */}
            <div className="relative">
              <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
                <Image
                  src="/bridge.png"
                  alt="Bridge: from the invisible to the visible"
                  width={720}
                  height={720}
                  className="h-auto w-full rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── The SYNDA Difference (4 cards + PLUS + = SYNDAPSIS) */}
      <section id="difference" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-slate-900">
            The SYNDA Difference
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-3">
            {/* Grid 2x2 con PLUS centrado */}
            <div className="relative md:col-span-2">
              <div className="grid gap-6 sm:grid-cols-2">
                <DiffCard
                  icon={<ShieldIcon />}
                  title="Anonymity First"
                  text="Protects identities → removes bias → only merit matters."
                />
                <DiffCard
                  icon={<MedalIcon />}
                  title="Challenge-based Meritocracy"
                  text="Talent is measured by solving real challenges, not resumes."
                />
                <DiffCard
                  icon={<NetworkIcon />}
                  title="Collective Intelligence"
                  text="A “super-brain” of diverse minds achieving the impossible."
                />
                <DiffCard
                  icon={<BulbIcon />}
                  title="Impact Innovation"
                  text="Transforms the invisible into visible results for business and society."
                />
              </div>

              {/* PLUS centrado (al estilo ALPAL) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none sm:block"
              >
                <span className="text-amber-400 text-5xl md:text-6xl font-black">+</span>
              </div>
            </div>

            {/* Columna derecha: = SYNDAPSIS */}
            <div className="flex flex-col items-center justify-center md:items-start">
              <div className="text-slate-400 text-6xl leading-none font-light">=</div>
              <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-wide text-sky-800">
                SYNDAPSIS
              </div>
              <a
                className="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
                href={REPOS.syndapsis}
                target="_blank"
                rel="noopener"
              >
                Open Syndapsis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What we do</h2>
        <div className="grid gap-4 md:grid-cols-2">
            <Card
              title="Enterprises — TRU-e Onboarding"
              desc="Brand Level, IET and WTP↔Price Gap to define priorities and the brief."
              cta={{ label: "Onboarding Enterprise", href: REPOS.onboardingEnterprise }}
            />
            <Card
              title="Agents — PTrust + Lateral interview"
              desc="Verification + superpowers (De Bono). Compete on merit, not identity."
              cta={{ label: "Onboarding Agents", href: REPOS.onboardingAgents }}
            />
          </div>
        </div>
      </section>

      {/* How we do it — Syndapsis */}
      <section id="how" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">How we do it — Syndapsis</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Step n="1" title="Brief & Reward" desc="Publish the challenge with reward and timeline." />
            <Step n="2" title="AHP Weights" desc="Questionnaire by De Bono hats to define the match." />
            <Step n="3" title="Ranking & Selection" desc="Agents prioritized by AHP; winners are chosen." />
            <Step n="4" title="Delivery & Evidence" desc="Validation and learning captured for TRU-e/IET." />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
              href={REPOS.syndapsis}
              target="_blank"
              rel="noopener"
            >
              Open Syndapsis
            </a>
            <a
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
              href={REPOS.onboardingAgents}
              target="_blank"
              rel="noopener"
            >
              Onboarding Agents
            </a>
          </div>
        </div>
      </section>

      {/* TRU-e calculator */}
      <section id="calculator" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">TRU-e calculator</h2>
          <p className="text-slate-700">Try the TRU-e method and get a quick motivational result.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
              href={REPOS.truCalculator}
              target="_blank"
              rel="noopener"
            >
              Open TRU-e Calculator
            </a>
            <a
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-white"
              href={REPOS.onboardingEnterprise}
              target="_blank"
              rel="noopener"
            >
              Start TRU-e
            </a>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section id="who" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Who we are — SYNDA</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ListCard
              title="Values"
              items={[
                "Merit and evidence (TRU-e / PTrust)",
                "Privacy and respect for neurodiversity",
                "Transparent criteria (AHP) and outcomes",
              ]}
            />
            <ListCard
              title="Different from traditional inclusive hiring"
              items={[
                "We don't place jobs — we solve problems",
                "Match by superpowers, not by CV",
                "Reward for outcomes; reputation for trust",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Syndatools */}
      <section id="syndatools" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Syndatools — Apps, agents & knowledge
          </h2>
          <p className="text-slate-700">
            Marketplace to power companies and agents. Includes Syndabooks.
          </p>
          <div className="mt-4">
            <a
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
              href={REPOS.syndatools}
              target="_blank"
              rel="noopener"
            >
              Open Syndatools
            </a>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Privacy Policy</h2>
          <p className="text-slate-700">
            Minimal data, encryption and explicit consent. Agent identities are protected; merit is evaluated.
          </p>
        </div>
      </section>

      {/* Manifesto modal */}
      <ManifestoModal open={manifestoOpen} onClose={() => setManifestoOpen(false)} />
    </>
  );
}

/* ───────── Subcomponents ───────── */

function DiffCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-xl bg-sky-50 text-sky-700">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
      </div>
    </div>
  );
}

/* Icons (puedes reemplazar por SVG/PNG propios) */
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l7 3v6c0 5-3.6 8.9-7 10-3.4-1.1-7-5-7-10V5l7-3Z" />
      <path d="M10.2 12.8l-1.7-1.7-1.4 1.4 3.1 3.1 6-6-1.4-1.4-4.6 4.6Z" fill="#10B981"/>
    </svg>
  );
}
function MedalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 3h8l-2.5 5H10.5L8 3Z" />
      <circle cx="12" cy="14" r="5" />
      <path d="M12 11.5l.9 1.9 2.1.3-1.5 1.5.3 2.1-1.8-1-1.8 1 .3-2.1-1.5-1.5 2.1-.3.9-1.9Z" fill="#F59E0B"/>
    </svg>
  );
}
function NetworkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.8 7.2 10.6 16M16.2 7.2 13.4 16M8.2 6h7.6" stroke="currentColor" strokeWidth="1.8" fill="none"/>
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3a7 7 0 0 1 5.7 11.1c-.7 1-1.7 2-1.7 3.2v.7H8v-.7c0-1.2-1-2.2-1.7-3.2A7 7 0 0 1 12 3Z"/>
      <rect x="9" y="19" width="6" height="2" rx="1" />
      <path d="M9 22h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Card({
  title,
  desc,
  cta,
}: {
  title: string;
  desc: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-700">{desc}</p>
      <a
        className="mt-3 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        href={cta.href}
        target="_blank"
        rel="noopener"
      >
        {cta.label}
      </a>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 font-bold text-slate-800">
          {n}
        </span>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-1 text-slate-700">{desc}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
