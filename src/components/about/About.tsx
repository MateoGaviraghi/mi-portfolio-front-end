"use client";

import { useEffect, useState } from "react";

export function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex items-center justify-center px-6 lg:px-24 py-12 md:py-20">
      <div className="max-w-5xl w-full">
        <div className="space-y-12">
          <div className={mounted ? "animate-slide-in-left" : "opacity-0"}>
            <span className="text-secondary font-mono text-sm">01. </span>
            <h2 className="text-4xl md:text-5xl font-bold inline">Sobre Mí</h2>
            <div className="h-px bg-gradient-to-r from-secondary to-transparent mt-4 w-full max-w-md" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 text-muted-foreground leading-relaxed ${
                mounted
                  ? "animate-slide-in-left animate-delay-200"
                  : "opacity-0"
              }`}
            >
              <p className="text-pretty">
                Soy un desarrollador fullstack apasionado por crear soluciones
                digitales que marcan la diferencia. Con más de 3 años de
                experiencia, he trabajado en proyectos desde startups hasta
                empresas consolidadas.
              </p>

              <p className="text-pretty">
                Mi enfoque combina la atención al detalle del frontend con la
                solidez arquitectónica del backend. Me especializo en construir
                aplicaciones escalables, mantenibles y centradas en el usuario.
              </p>

              <p className="text-pretty">
                Cuando no estoy programando, me encontrarás explorando nuevas
                tecnologías, contribuyendo a proyectos open source o
                compartiendo conocimiento con la comunidad.
              </p>
            </div>

            <div
              className={`relative group ${
                mounted
                  ? "animate-slide-in-right animate-delay-300"
                  : "opacity-0"
              }`}
            >
              <div className="aspect-square rounded-lg bg-muted overflow-hidden border border-border hover:border-secondary transition-all duration-500 hover:scale-[1.02]">
                {/* Placeholder image if no profile image is available */}
                <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-4xl font-bold text-secondary">
                  MG
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-secondary rounded-lg -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
