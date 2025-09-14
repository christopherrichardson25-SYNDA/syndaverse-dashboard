import Image from "next/image";
import HubCard from "@/components/HubCard";
import Nav from "@/components/Nav";

// Base (ajústala a tu org/repos reales)
const GH = "https://github.com/christopherrichardson25-SYNDA";

// Enlaces centralizados
const LINKS = {
  tru_e_iet: `${GH}/tru-e-iet`,             // IET por industria / etiqueta TRU-e
  tru_e_onboarding: `${GH}/tru-e-onboarding`,
  syndapsis: `${GH}/syndapsis-platform`,
  syndapsis_new: `${GH}/syndapsis-platform/new`,
  syndatools: `${GH}/syndatools`,
  knowledge: `${GH}/syndatools#knowledge`,  // Syndabooks incorporado en Syndatools
  agents_onb: `${GH}/onboarding-agents`,
  companies_onb: `${GH}/onboarding-enterprises`,
  dashboard: `${GH}/dashboard`,
};

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-16">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-10 text-center shadow-xl ring-1 ring-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(124,58,237,.22),transparent_60%)]" />
          <div className="relative flex flex-col items-center">
            <Image
              src="/synda-logo.png"
              alt="SYNDΛverse"
              width={220}
              height={64}
              priority
              className="opacity-95"
            />
            <p className="mt-4 max-w-2xl text-slate-300">
              Ecosistema para <b>valorar la confianza</b> por industria (TRU-e),
              <b> resolver desafíos</b> con agentes neurodivergentes (Syndapsis) y
              <b> escalar herramientas & conocimiento</b> (Syndatools).
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={LINKS.dashboard}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 font-semibold text-white shadow hover:opacity-95"
              >
                Abrir Dashboard
              </a>
              <a
                href="#pilares"
                className="rounded-xl border border-white/20 px-4 py-2 font-semibold text-slate-100 hover:bg-white/5"
              >
                Ver los 3 pilares
              </a>
            </div>
          </div>
        </section>

        {/* PILARES */}
        <section id="pilares" className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Tres pilares</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HubCard
              title="TRU-e · Indicadores de Confianza (IET)"
              desc="Índice IET por industria, etiqueta TRU-e, onboarding de empresas y PTrust para agentes."
              href={LINKS.tru_e_iet}
              external
            />
            <HubCard
              title="Syndapsis · Desafíos + Match AHP"
              desc="Publica challenges con premio. El cuestionario pondera sombreros y el AHP integra el match."
              href={LINKS.syndapsis}
              external
            />
            <HubCard
              title="Syndatools · Apps, Agentes & Knowledge"
              desc="Marketplace de herramientas y conocimiento (incluye Syndabooks: guías, casos y datasets)."
              href={LINKS.syndatools}
              external
            />
          </div>
        </section>

        {/* ACCESOS RÁPIDOS */}
        <section className="mt-10">
          <h3 className="mb-3 text-lg font-semibold">Accesos rápidos</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HubCard
              title="Ver IET por industria"
              desc="Ranking y comparativas de confianza (TRU-e)."
              href={LINKS.tru_e_iet}
              external
            />
            <HubCard
              title="Iniciar TRU-e (Empresas)"
              desc="Nivel de Marca, IET y Gap WTP ↔ Precio."
              href={LINKS.tru_e_onboarding}
              external
            />
            <HubCard
              title="Onboarding Agentes (PTrust)"
              desc="Verificación + entrevista lateral (De Bono) y creación de avatar."
              href={LINKS.agents_onb}
              external
            />
            <HubCard
              title="Publicar Challenge"
              desc="Define premio y ponderaciones; el AHP hace el match."
              href={LINKS.syndapsis_new}
              external
            />
            <HubCard
              title="Explorar Challenges"
              desc="Participa solo o en equipo; gana XP y badges."
              href={LINKS.syndapsis}
              external
            />
            <HubCard
              title="Knowledge (Syndabooks)"
              desc="Playbooks, guías y casos para mejorar confianza."
              href={LINKS.knowledge}
              external
            />
          </div>
        </section>
      </main>
    </>
  );
}

