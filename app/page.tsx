import Image from "next/image";
import Nav from "@/components/Nav";

const GH = "https://github.com/christopherrichardson25-SYNDA";
const REPOS = {
  onboardingEnterprise: `${GH}/onboarding-enterprises`,
  onboardingAgents: `${GH}/onboarding-agents`,
  truCalculator: `${GH}/tru-e-calculator`,
  syndapsis: `${GH}/syndapsis-platform`,
  syndatools: `${GH}/syndatools`,
};

export default function Home() {
  return (
    <>
      <Nav />

      {/* HERO (look similar: hero grande con logo + claim + CTA chat) */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(124,58,237,.22),transparent_60%)]" />
        <div className="container-syn section text-center">
          <Image src="/synda-logo.png" alt="SYNDA" width={260} height={76} priority className="mx-auto opacity-95" />
          <h1 className="mt-6 text-3xl md:text-5xl font-bold">Hacemos visible lo invisible</h1>
          <p className="mt-3 max-w-2xl mx-auto text-slate-300">
            Agentes neurodivergentes + empresas, resolviendo problemas complejos para mejorar la <b>confianza</b> en tu industria (TRU-e).
          </p>
          <div className="mt-6 flex justify-center">
            <a href="mailto:contact@syndaverse.com" className="btn btn-primary">LET’S CHAT</a>
          </div>
        </div>
      </section>

      {/* “The SYNDΛ difference” (tiles como ALPAL Difference) */}
      <section className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">The SYNDΛ difference</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <DiffTile title="TRU-e (IET)" desc="Valorizamos la confianza por industria con un indicador accionable." />
          <DiffTile title="Match AHP" desc="Ponderaciones por sombreros (De Bono) para alinear desafío y talento." />
          <DiffTile title="Mérito & Privacidad" desc="PTrust, anonimato controlado y reputación por evidencia." />
          <DiffTile title="Syndatools" desc="Apps, agentes y knowledge para acelerar soluciones." />
        </div>
      </section>

      {/* WHAT WE DO (Agentes + Empresas, con CTAs a repos de onboarding) */}
      <section id="what" className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">What we do</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            title="Empresas — Onboarding TRU-e"
            desc="Nivel de Marca, IET y Gap WTP↔Precio para definir prioridades y brief."
            ctas={[{ label: "Onboarding Enterprise", href: REPOS.onboardingEnterprise }]}
          />
          <Card
            title="Agentes — PTrust + Entrevista lateral"
            desc="Verificación + superpoderes (De Bono). Compites por mérito, no por identidad."
            ctas={[{ label: "Onboarding Agents", href: REPOS.onboardingAgents }]}
          />
        </div>
      </section>

      {/* HOW WE DO IT (Syndapsis) */}
      <section id="how" className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">How we do it — Syndapsis</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <Step n="1" title="Brief + Premio" desc="Publica el desafío con recompensa y plazos." />
          <Step n="2" title="Ponderaciones AHP" desc="Cuestionario por sombreros de De Bono; define el match." />
          <Step n="3" title="Ranking & Selección" desc="Agentes priorizados por AHP; se eligen ganadores." />
          <Step n="4" title="Entrega & Evidencia" desc="Validación y aprendizaje para TRU-e/IET." />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={REPOS.syndapsis} target="_blank" rel="noopener">Abrir Syndapsis</a>
          <a className="btn btn-ghost" href={REPOS.onboardingAgents} target="_blank" rel="noopener">Onboarding Agents</a>
        </div>
      </section>

      {/* TRU-e CALCULATOR (CTA al repo/aplicación) */}
      <section id="calculator" className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">TRU-e calculator</h2>
        <p className="text-slate-300">Prueba el método TRU-e y obtén un resultado rápido (motivacional).</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={REPOS.truCalculator} target="_blank" rel="noopener">Abrir Calculadora TRU-e</a>
          <a className="btn btn-ghost" href={REPOS.onboardingEnterprise} target="_blank" rel="noopener">Iniciar TRU-e</a>
        </div>
        {/* Si quieres embed local, luego creamos un componente y lo colocamos aquí */}
      </section>

      {/* WHO WE ARE (valores + diferencia vs empleo inclusivo tradicional) */}
      <section id="who" className="container-syn section">
        <h2 className="mb-3 text-xl font-semibold">Who we are — SYNDA</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            title="Valores"
            desc=""
            list={[
              "Mérito y evidencia (TRU-e / PTrust)",
              "Privacidad y respeto de la neurodiversidad",
              "Transparencia de criterios (AHP) y resultados",
            ]}
          />
          <Card
            title="Diferencia vs empleo inclusivo tradicional"
            desc=""
            list={[
              "No buscamos puestos: resolvemos problemas",
              "Match por superpoderes, no por CV",
              "Recompensa por resultados; reputación por confianza",
            ]}
          />
        </div>
      </section>

      {/* SYNDATOOLS (Resources → Syndatools) */}
      <section id="syndatools" className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">Syndatools — Apps, agentes & knowledge</h2>
        <p className="text-slate-300">Marketplace para potenciar empresas y agentes. Incluye Syndabooks.</p>
        <div className="mt-4">
          <a className="btn btn-primary" href={REPOS.syndatools} target="_blank" rel="noopener">Abrir Syndatools</a>
        </div>
      </section>

      {/* PRIVACY + CHAT */}
      <section id="privacy" className="container-syn section">
        <h2 className="mb-2 text-xl font-semibold">Privacy Policy</h2>
        <p className="text-slate-300">Datos mínimos, cifrado y consentimiento explícito. Identidad de agentes protegida; se evalúa el mérito.</p>
        <a href="mailto:contact@syndaverse.com" className="btn btn-primary mt-4">LET’S CHAT</a>
      </section>
    </>
  );
}

function DiffTile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-slate-300">{desc}</p>
    </div>
  );
}
function Card({
  title, desc, list, ctas,
}: { title: string; desc?: string; list?: string[]; ctas?: { label: string; href: string }[] }) {
  return (
    <div className="card">
      <h3 className="font-semibold">{title}</h3>
      {desc && <p className="mt-1 text-slate-300">{desc}</p>}
      {list && (
        <ul className="mt-2 list-disc pl-5 text-slate-300">
          {list.map((it) => <li key={it}>{it}</li>)}
        </ul>
      )}
      {ctas && (
        <div className="mt-3 flex flex-wrap gap-2">
          {ctas.map((c) => (
            <a key={c.label} className="btn btn-ghost" href={c.href} target="_blank" rel="noopener">
              {c.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-600/40 to-cyan-500/40 font-bold">{n}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-1 text-slate-300">{desc}</p>
    </div>
  );
}
