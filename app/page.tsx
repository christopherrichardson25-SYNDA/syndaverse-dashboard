// app/page.tsx
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

      {/* ───────────────────────── HERO: banda azul + CTA (ALPAL-like) */}
      <section className="relative bg-gradient-to-r from-sky-700 to-blue-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Lado Izquierdo: copy */}
            <div>
              <Image
                src="/synda-logo.png"
                alt="SYNDA"
                width={220}
                height={64}
                priority
                className="w-auto h-10 md:h-12"
              />
              <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                Hacemos visible lo invisible
              </h1>
              <p className="mt-3 text-white/90 md:text-lg">
                Agentes neurodivergentes + empresas, resolviendo problemas
                complejos para elevar la <b>confianza</b> en tu industria (TRU-e).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:contact@syndaverse.com"
                  className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
                >
                  LET’S CHAT
                </a>
                <a
                  href={REPOS.truCalculator}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 font-semibold text-white ring-1 ring-white/30 hover:bg-white/15"
                >
                  Probar TRU-e calculator
                </a>
              </div>
            </div>

            {/* Lado Derecho: "tarjeta" demo (sustituye cuando tengas imagen propia) */}
            <div className="relative">
              <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-100 text-sky-700">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 3a9 9 0 100 18 9 9 0 000-18Zm1 14.93V13h4.93A7.002 7.002 0 0113 17.93ZM11 6.07V11H6.07A7.002 7.002 0 0111 6.07ZM6.07 13H11v4.93A7.002 7.002 0 016.07 13ZM13 11V6.07A7.002 7.002 0 0117.93 11H13Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      TRU-e snapshot
                    </h3>
                    <p className="text-sm text-slate-600">
                      Vista rápida de confianza por industria.
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• IET sector: 72 (↑ 3m)</li>
                  <li>• Gap WTP ↔ Precio: −4%</li>
                  <li>• Reclamos / 1k servicios: 12</li>
                </ul>
              </div>

              {/* Checkmark estilo “aprobado” */}
              <div className="absolute -right-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white ring-4 ring-white/40">
                ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── The SYNDΛ difference (tiles) */}
      <section className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            The SYNDΛ difference
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Tile
              title="TRU-e (IET)"
              desc="Valorizamos la confianza por industria con un indicador accionable."
            />
            <Tile
              title="Match AHP"
              desc="Ponderaciones por sombreros (De Bono) para alinear desafío y talento."
            />
            <Tile
              title="Mérito & Privacidad"
              desc="PTrust, anonimato controlado y reputación por evidencia."
            />
            <Tile
              title="Syndatools"
              desc="Apps, agentes y knowledge para acelerar soluciones."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── What we do */}
      <section id="what" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What we do</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card
              title="Empresas — Onboarding TRU-e"
              desc="Nivel de Marca, IET y Gap WTP↔Precio para definir prioridades y brief."
              cta={{ label: "Onboarding Enterprise", href: REPOS.onboardingEnterprise }}
            />
            <Card
              title="Agentes — PTrust + Entrevista lateral"
              desc="Verificación + superpoderes (De Bono). Compites por mérito, no por identidad."
              cta={{ label: "Onboarding Agents", href: REPOS.onboardingAgents }}
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── How we do it — Syndapsis */}
      <section id="how" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">
            How we do it — Syndapsis
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Step n="1" title="Brief + Premio" desc="Publica el desafío con recompensa y plazos." />
            <Step n="2" title="Ponderaciones AHP" desc="Cuestionario por sombreros de De Bono; define el match." />
            <Step n="3" title="Ranking & Selección" desc="Agentes priorizados por AHP; se eligen ganadores." />
            <Step n="4" title="Entrega & Evidencia" desc="Validación y aprendizaje para TRU-e/IET." />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
              href={REPOS.syndapsis}
              target="_blank"
              rel="noopener"
            >
              Abrir Syndapsis
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

      {/* ───────────────────────── TRU-e calculator (sección clara con CTA) */}
      <section id="calculator" className="bg-sky-50">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-2 text-xl font-semibold text-slate-900">TRU-e calculator</h2>
              <p className="text-slate-700">
                Prueba el método TRU-e y obtén un resultado rápido (motivacional).
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
                  href={REPOS.truCalculator}
                  target="_blank"
                  rel="noopener"
                >
                  Abrir Calculadora TRU-e
                </a>
                <a
                  className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-white"
                  href={REPOS.onboardingEnterprise}
                  target="_blank"
                  rel="noopener"
                >
                  Iniciar TRU-e
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              {/* Ilustración simple con SVG existente en /public (ajusta si quieres) */}
              <div className="mx-auto grid max-w-sm place-items-center rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <Image src="/window.svg" alt="Calculator" width={160} height={120} />
                <p className="mt-3 text-center text-sm text-slate-600">
                  Estimación básica: usa tus datos para simular tu etiqueta TRU-e.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Who we are */}
      <section id="who" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Who we are — SYNDA</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ListCard
              title="Valores"
              items={[
                "Mérito y evidencia (TRU-e / PTrust)",
                "Privacidad y respeto de la neurodiversidad",
                "Transparencia de criterios (AHP) y resultados",
              ]}
            />
            <ListCard
              title="Diferencia vs empleo inclusivo tradicional"
              items={[
                "No buscamos puestos: resolvemos problemas",
                "Match por superpoderes, no por CV",
                "Recompensa por resultados; reputación por confianza",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Syndatools */}
      <section id="syndatools" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Syndatools — Apps, agentes & knowledge
          </h2>
          <p className="text-slate-700">
            Marketplace para potenciar empresas y agentes. Incluye Syndabooks.
          </p>
          <div className="mt-4">
            <a
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
              href={REPOS.syndatools}
              target="_blank"
              rel="noopener"
            >
              Abrir Syndatools
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Privacy + chat */}
      <section id="privacy" className="bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Privacy Policy</h2>
          <p className="text-slate-700">
            Datos mínimos, cifrado y consentimiento explícito. Identidad de agentes protegida; se evalúa el mérito.
          </p>
          <a
            href="mailto:contact@syndaverse.com"
            className="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white hover:bg-emerald-600"
          >
            LET’S CHAT
          </a>
        </div>
      </section>
    </>
  );
}

/* ───────────── Subcomponentes simples (sin depender de globals.css) ───────────── */

function Tile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-slate-700">{desc}</p>
    </div>
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
