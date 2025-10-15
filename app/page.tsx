"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import NavHeader from "../components/NavHeader";
import ManifestoModal from "../components/ManifestoModal";
import SyndabrainModal from "../components/SyndabrainModal";

const GH = "https://github.com/christopherrichardson25-SYNDA";
const REPOS = {
  onboardingEnterprise: `${GH}/onboarding-enterprises`,
  onboardingAgents: `${GH}/onboarding-agents`,
  syndapsis: `${GH}/syndapsis-platform`,
  syndatools: `${GH}/syndatools`,
  syndapticCalculator: `${GH}/syndaptic-calculator`,
};

export default function Home() {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <NavHeader onOpenChat={() => setChatOpen(true)} />

      {/* HERO */}
      <section
        id="hero"
        className="hero relative bg-gradient-to-r from-sky-700 to-blue-900 text-white"
      >
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="mt-0 text-3xl font-bold leading-tight text-white md:text-5xl">
                We make the invisible visible
              </h1>
              <p className="mt-4 text-white/90 md:text-lg">
                We unite <b>science</b>, <b>resonance</b>, and <b>community</b>{" "}
                to turn <b>difference</b> into a <b>superpower</b> and transform
                the invisible into a <b>creative force</b>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setManifestoOpen(true)}
                >
                  Find out more
                </button>
              </div>
            </div>

            {/* Visual SYNDAPSIS */}
            <div className="relative">
              <div className="card p-4 text-center shadow-md">
                <SyndapsisLogo className="mx-auto h-auto w-64 md:w-72" />
                <div className="mt-3 text-2xl font-extrabold tracking-wide text-white">
                  SYNDAPSIS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The SYNDΛ Difference */}
      <section id="difference" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-slate-900">
            The SYNDΛ Difference
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-3">
            <div className="relative md:col-span-2 md:min-h-[360px]">
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
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none sm:block"
              >
                <span className="z-10 text-amber-400 text-5xl font-black md:text-6xl">
                  +
                </span>
              </div>
            </div>

            <div className="relative md:h-full md:min-h-[360px]">
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-12 md:-left-16 text-slate-400 text-4xl font-light leading-none md:text-6xl"
              >
                =
              </span>
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src="/bridge.png"
                  alt="Bridge: from the invisible to the visible"
                  width={280}
                  height={160}
                  className="ml-10 h-auto w-56 md:ml-12 md:w-64"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="bg-white scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            What we do
          </h2>
          <p className="mt-2 max-w-3xl text-lg text-slate-800 md:text-xl">
            We connect agents with <b>cognitive superpowers</b> who solve
            complex problems for society and companies in innovative ways. Both
            companies and agents complete an onboarding to interact through our
            challenge platform, <b>Syndapsis</b>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              className="btn-primary"
              href={REPOS.onboardingEnterprise}
              target="_blank"
              rel="noopener"
            >
              Onboarding Enterprise
            </a>
            <a
              className="btn-outline"
              href={REPOS.onboardingAgents}
              target="_blank"
              rel="noopener"
            >
              Onboarding Agents
            </a>
          </div>
        </div>
      </section>

      {/* How we do it */}
      <section id="how-we-do-it" className="bg-white scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            How we do it
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Step
              n="1"
              title="Onboarding"
              desc="Company and agent setup, goals, and context."
            />
            <Step
              n="2"
              title="TRU-e Evaluation"
              desc="Trust diagnostic and IET coherence measurement."
            />
            <Step
              n="3"
              title="Challenge Matching"
              desc="AI-AHP model matches agents with the right challenges."
            />
            <Step
              n="4"
              title="Delivery & Learning"
              desc="Results validated and transformed into collective learning."
            />
          </div>
        </div>
      </section>

      {/* Syndatools */}
      <section id="syndatools" className="bg-white scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Syndatools — Apps, agents & knowledge
          </h2>
          <p className="text-slate-700">
            Marketplace to power companies and agents. Includes Syndabooks.
          </p>
          <div className="mt-4">
            <a
              className="btn-primary"
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
      <section id="privacy-policy" className="bg-white scroll-mt-24">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Privacy Policy
          </h2>
          <p className="text-slate-700">
            Minimal data, encryption and explicit consent. Agent identities are
            protected; merit is evaluated.
          </p>
        </div>
      </section>

      {/* Modals */}
      <ManifestoModal
        open={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />
      <SyndabrainModal
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        pageContext={{ source: "landing", section: "header" }}
      />
    </>
  );
}

/* ===== Helpers & icons ===== */

function SyndapsisLogo({ className }: { className?: string }) {
  const candidates = ["/SYNDAPSIS.png", "/Syndapsis.png", "/syndapsis.png"];
  const [idx, setIdx] = useState(0);
  return (
    <Image
      src={candidates[idx]}
      alt="Syndapsis"
      width={300}
      height={180}
      className={className}
      priority
      onError={() => setIdx((i) => (i + 1 < candidates.length ? i + 1 : i))}
    />
  );
}

function DiffCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="card p-6">
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

/* Íconos */
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l7 3v6c0 5-3.6 8.9-7 10-3.4-1.1-7-5-7-10V5l7-3Z" />
      <path
        d="M10.2 12.8l-1.7-1.7-1.4 1.4 3.1 3.1 6-6-1.4-1.4-4.6 4.6Z"
        fill="#10B981"
      />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 3h8l-2.5 5H10.5L8 3Z" />
      <circle cx="12" cy="14" r="5" />
      <path
        d="M12 11.5l.9 1.9 2.1.3-1.5 1.5.3 2.1-1.8-1-1.8 1 .3-2.1-1.5-1.5 2.1-.3.9-1.9Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path
        d="M7.8 7.2 10.6 16M16.2 7.2 13.4 16M8.2 6h7.6"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3a7 7 0 0 1 5.7 11.1c-.7 1-1.7 2-1.7 3.2v.7H8v-.7c0-1.2-1-2.2-1.7-3.2A7 7 0 0 1 12 3Z" />
      <rect x="9" y="19" width="6" height="2" rx="1" />
      <path d="M9 22h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="card p-5">
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

