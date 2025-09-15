// app/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

// Si tu nav se llama distinto, ajusta la importación:
import NavHeader from "../components/NavHeader";
// Si usas NavWhite, cambia a: import NavWhite from "../components/NavWhite";

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
      {/* <NavWhite />  // usa este si tu proyecto no tiene NavHeader */}

      {/* HERO: blue band + CTA (no logo dentro del hero) */}
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

            {/* Right: replace TRU-e snapshot with bridge.png */}
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

      {/* ───────── The SYNDA Difference */}
      <section id="difference" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-center text-3xl font-semibold leading-tight text-slate-900 md:text-left">
            The SYNDA Difference
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <DiffCard
              icon={<MaskIcon />}
              title="Anonymity First"
              text="Protects identities → removes bias → only merit matters."
            />
            <DiffCard
              icon={<TrophyIcon />}
              title="Challenge-based Meritocracy"
              text="Talent is measured by solving real challenges, not resumes."
            />
            <DiffCard
              icon={<PuzzleIcon />}
              title="Collective Intelligence"
              text="A “super-brain” of diverse minds achieving the impossible."
            />
            <DiffCard
              icon={<RocketIcon />}
              title="Impact Innovation"
              text="Transforms the invisible into visible results for business and society."
            />
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
          <p className="text-slate-700">
            Try the TRU-e method and get a quick motivational result.
          </p>
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

function DiffCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
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

/* Icons */
function MaskIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 5c4.5 0 8 1.2 8 3.5 0 3.9-3.6 7.3-8 9.5-4.4-2.2-8-5.6-8-9.5C4 6.2 7.5 5 12 5Zm-4.8 4a2.2 2.2 0 1 0 0 4.4A2.2 2.2 0 0 0 7.2 9Zm9.6 0a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z"/>
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 3h12v2h2a2 2 0 0 1-2 2h-1.1A6.9 6.9 0 0 1 13 12.9V15h3v2H8v-2h3v-2.1A6.9 6.9 0 0 1 7.1 7H6A2 2 0 0 1 4 5h2V3Zm12 2V4H6v1h1.1a5 5 0 1 0 9.8 0H18Z"/>
    </svg>
  );
}
function PuzzleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 3a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h-1a2 2 0 1 0 0 4h1v2a2 2 0 0 1-2 2h-2v-1a2 2 0 1 0-4 0v1H8a2 2 0 0 1-2-2v-2h1a2 2 0 1 0 0-4H6V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2Z"/>
    </svg>
  );
}
function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 3a7 7 0 0 1 7 7c0 3-2.3 5.9-4.6 8.2a1 1 0 0 1-.7.3H14l-2 2-1.2-3.2L7.6 16 10 14v-1.7a1 1 0 0 1 .3-.7C8 9.3 9 3 14 3Zm-1.5 6.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"/>
      <path d="M6 19c.7-.7 1.8-1 2.6-.2.8.8.5 1.9-.2 2.6-1 .9-2.9 1.3-3.4.8-.5-.5-.1-2.4.9-3.2Z" fill="#F59E0B"/>
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
