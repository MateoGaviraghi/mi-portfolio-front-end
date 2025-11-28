"use client";

import {
  ArrowRight,
  Download,
  Sparkles,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="space-y-8">
          <div
            className={`inline-flex items-center gap-2 ${
              mounted ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-mono text-sm">
              Bienvenido a mi portfolio
            </span>
          </div>

          <h1
            className={`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
              mounted ? "animate-slide-in-up animate-delay-100" : "opacity-0"
            }`}
          >
            <span className="text-balance">Mateo Gaviraghi</span>
          </h1>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
              mounted ? "animate-slide-in-up animate-delay-200" : "opacity-0"
            }`}
          >
            <span className="text-balance bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Full Stack Developer
            </span>
          </h2>

          <p
            className={`text-xl text-muted-foreground max-w-2xl leading-relaxed ${
              mounted ? "animate-slide-in-up animate-delay-300" : "opacity-0"
            }`}
          >
            <span className="text-pretty">
              Creo soluciones completas desde el Frontend (React, Next.js) hasta
              el Backend (NestJS, Node.js) con TypeScript, IA y más.
            </span>
          </p>

          <div
            className={`flex flex-wrap gap-4 pt-4 ${
              mounted ? "animate-slide-in-up animate-delay-400" : "opacity-0"
            }`}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-secondary/50 transition-all hover:scale-105"
            >
              Ver Proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/cv/mateo-gaviraghi-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-border px-8 py-4 rounded-lg font-medium hover:border-secondary hover:bg-secondary/10 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Descargar CV
            </a>
          </div>

          <div
            className={`flex items-center gap-6 pt-8 ${
              mounted ? "animate-slide-in-up animate-delay-500" : "opacity-0"
            }`}
          >
            <a
              href="https://github.com/mateogaviraghi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-secondary transition-colors transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/mateogaviraghi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-secondary transition-colors transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:mateogaviraghi24@gmail.com"
              className="text-muted-foreground hover:text-secondary transition-colors transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
