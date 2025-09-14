// app/page.tsx
import Image from "next/image";
import Nav from "@/components/Nav";
// import TrueCalculator from "@/components/TrueCalculator"; // opcional

const GH_ORG = "https://github.com/christopherrichardson25-SYNDA";

const REPOS = {
  onboardingEnterprise: `${GH_ORG}/onboarding-enterprises`,
  onboardingAgents: `${GH_ORG}/onboarding-agents`,
  truCalculator: `${GH_ORG}/tru-e-calculator`,
  syndapsis: `${GH_ORG}/syndapsis-platform`,
  syndatools: `${GH_ORG}/syndatools`,
};

export default function Home() {
  return (
    <>
      <Nav />

      <main className="mx-auto max-w-6xl px-4 py-16">
        {/* WHAT WE DO */}
        <section id="what" className="flex flex-col items-center text-center">
          <Image src="/synda-logo.png" alt="SYNDA" width={260} height={76} priority />
          <p className="mt-4 max-w-2xl text-gray-700 dark:text-slate-300">
            Hacemos visible lo invisible: conectamos <b>agentes neurodivergentes</b> con
            <b> empresas</b> para resolver problemas complejos y mejorar la <b>confianza</b> (TRU-e).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={REPOS.onboardingEnterprise} target="_blank" rel="noopener">
              Onboarding Enterprise
            </a>
            <a className="btn btn-ghost" href={REPOS.onboardingAgents} target="_blank" rel="noopener">
              Onboarding Agents
            </a>
          </div>
        </section>

        {/* HOW WE DO IT — Syndapsis */}
        <section id="how" className="mt-14">
          <h2 className="mb-2 text-xl font-semibold">How we do it — Syndapsis</h2>
          <p className="text-slate-300">
            Publica challenges con premio; la empresa pondera criterios (AHP por sombreros de De Bono) y
            el sistema ranquea a los agentes. Selección y entrega con evidencia.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={REPOS.syndapsis} target="_blank" rel="noopener">
              Abrir Syndapsis
            </a>
            <a className="btn btn-ghost" href={REPOS.onboardingAgents} target="_blank" rel="noopener">
              Onboarding Agents
            </a>
          </div>
        </section>

        {/* TRU-e CALCULATOR */}
        <section id="calculator" className="mt-14">
          <h2 className="mb-2 text-xl font-semibold">TRU-e calculator</h2>
          <p className="text-slate-300">
            Prueba el método TRU-e para tu marca y obtén un resultado rápido (motivacional).
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={REPOS.truCalculator} target="_blank" rel="noopener">
              Abrir Calculadora TRU-e
            </a>
            <a className="btn btn-ghost" href={REPOS.onboardingEnterprise} target="_blank" rel="noopener">
              Iniciar TRU-e (Empresas)
            </a>
          </div>
          {/* <div className="mt-6"><TrueCalculator /></div> */}
        </section>

        {/* WHO WE ARE */}
        <section id="who" className="mt-14">
          <h2 className="mb-3 text-xl font-semibold">Who we are — SYNDA</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card">
              <h3 className="font-semibold">Valores</h3>
              <ul className="mt-2 list-disc pl-5 text-slate-300">
                <li>Mérito y evidencia (TRU-e / PTrust)</li>
                <li>Privacidad y respeto de la neurodiversidad</li>
                <li>Transparencia de criterios (AHP) y resultados</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="font-semibold">Diferencia vs empleo inclusivo tradicional</h3>
              <ul className="mt-2 list-disc pl-5 text-slate-300">
                <li>No buscamos puestos: resolvemos <b>problemas</b></li>
                <li>Match por <b>superpoderes</b>, no por CV</li>
                <li>Recompensa por resultados; reputación por confianza</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SYNDATOOLS */}
        <section id="syndatools" className="mt-14">
          <h2 className="mb-2 text-xl font-semibold">Syndatools — Apps, agentes & knowledge</h2>
          <p className="text-slate-300">Marketplace para potenciar empresas y agentes. Incluye Syndabooks.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={REPOS.syndatools} target="_blank" rel="noopener">
              Abrir Syndatools
            </a>
          </div>
        </section>

        {/* PRIVACY & CHAT */}
        <section id="privacy" className="mt-14">
          <h2 className="mb-2 text-xl font-semibold">Privacy Policy</h2>
          <p className="text-slate-300">
            Datos mínimos, cifrado y consentimiento explícito. Identidad de agentes protegida; se evalúa el mérito.
          </p>
          <a href="mailto:contact@syndaverse.com" className="btn btn-primary mt-4">LET’S CHAT</a>
        </section>
      </main>
    </>
  );
}

