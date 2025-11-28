"use client";

import { Briefcase, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Presente",
    description:
      "Desarrollo de aplicaciones web completas para clientes internacionales. Especialización en Next.js, React y Node.js.",
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "TailwindCSS"],
  },
  {
    title: "Frontend Developer",
    company: "Tech Solutions",
    period: "2021 - 2023",
    description:
      "Implementación de interfaces de usuario modernas y responsivas. Optimización de rendimiento y accesibilidad.",
    technologies: ["React", "Vue.js", "SASS", "JavaScript"],
  },
];

export function Experience() {
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
            <span className="text-secondary font-mono text-sm">02. </span>
            <h2 className="text-4xl md:text-5xl font-bold inline">
              Experiencia
            </h2>
            <div className="h-px bg-gradient-to-r from-secondary to-transparent mt-4 w-full max-w-md" />
          </div>

          <div className="relative space-y-8">
            {/* Línea vertical decorativa */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-secondary via-accent to-transparent hidden md:block" />

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative border border-border rounded-lg p-6 md:p-8 md:ml-8 hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:scale-[1.02] ${
                  mounted
                    ? `animate-slide-in-right animate-delay-${
                        (index + 2) * 100
                      }`
                    : "opacity-0"
                }`}
              >
                {/* Punto en la línea temporal */}
                <div className="absolute -left-10 top-8 w-3 h-3 bg-secondary rounded-full border-4 border-background hidden md:block group-hover:scale-150 transition-transform" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-sm font-mono rounded-md hover:bg-secondary/20 hover:text-secondary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
