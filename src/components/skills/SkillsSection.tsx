"use client";

import { useEffect, useState } from "react";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "NestJS",
    ],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "AWS", "Git", "CI/CD", "Linux", "Nginx"],
  },
  {
    category: "Otros",
    skills: ["REST APIs", "Websockets", "Testing", "Agile", "UI/UX", "SEO"],
  },
];

export function SkillsSection() {
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
            <span className="text-secondary font-mono text-sm">04. </span>
            <h2 className="text-4xl md:text-5xl font-bold inline">
              Habilidades
            </h2>
            <div className="h-px bg-gradient-to-r from-secondary to-transparent mt-4 w-full max-w-md" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`group border border-border rounded-lg p-6 hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:scale-[1.02] ${
                  mounted
                    ? `animate-scale-in animate-delay-${(index + 2) * 100}`
                    : "opacity-0"
                }`}
              >
                <h3 className="text-xl font-bold mb-6 text-accent flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse" />
                  {category.category}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className={`flex items-center gap-2 group/skill ${
                        mounted
                          ? `animate-slide-in-left animate-delay-${
                              (skillIndex + index * 2) * 50
                            }`
                          : "opacity-0"
                      }`}
                    >
                      <div className="w-2 h-2 bg-secondary rounded-full group-hover/skill:scale-150 transition-transform duration-300" />
                      <span className="text-muted-foreground group-hover/skill:text-foreground group-hover/skill:translate-x-1 transition-all duration-200">
                        {skill}
                      </span>
                    </div>
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
