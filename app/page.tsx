import Image from "next/image";
import HubCard from "@/components/HubCard";
import Nav from "@/components/Nav";

const GH = "https://github.com/christopherrichardson25-SYNDA";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-16">
        {/* LOGO */}
        <section className="flex flex-col items-center text-center">
          <Image
            src="/synda-logo.png"   // tu logo dentro de /public
            alt="SYNDAverse"
            width={280}
            height={80}
            priority
            className="opacity-90"
          />
          <p className="mt-4 max-w-2xl text-gray-700">
            Ecosistema para <b>promover y canalizar capacidades neurodivergentes</b> con
            tecnología, redes cognitivas y pensamiento lateral.
          </p>
        </section>

        {/* Hubs debajo de SYNDAverse (en el orden solicitado) */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Explorar hubs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <HubCard
              title="SYNDApsis Platform"
              desc="Publicación de desafíos a licitar y postulaciones de agentes/equipos."
              href={`${GH}/syndapsis-platform`}
              external
            />
            <HubCard
              title="VibraTools"
              desc="Vibramed, Vibragro y verticales resonantes."
              href={`${GH}/vibratools`}
              external
            />
            <HubCard
              title="Onboarding Agentes"
              desc="Registro con cuestionario Edward de Bono."
              href={`${GH}/onboarding-agents`}
              external
            />
            <HubCard
              title="Onboarding Empresas"
              desc="Registro y preparación de organizaciones."
              href={`${GH}/onboarding-enterprises`}
              external
            />
            <HubCard
              title="TRU-e Calculator"
              desc="Motor reputacional y API (coherencia, confianza, WTP)."
              href={`${GH}/tru-e-calculator`}
              external
            />
          </div>
        </section>
      </main>
    </>
  );
}

