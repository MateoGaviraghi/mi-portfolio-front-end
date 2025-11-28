"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  ArrowRight,
  Code,
  Sparkles,
  Zap,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Usar setTimeout para evitar setState síncrono en el effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-slate-300">
              Disponible para nuevos proyectos
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Full Stack
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Transformo ideas en experiencias digitales excepcionales
              utilizando
              <span className="text-primary-400 font-semibold"> Next.js</span>,
              <span className="text-blue-400 font-semibold"> TypeScript</span> y
              <span className="text-purple-400 font-semibold"> AI</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/projects">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                Ver Proyectos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:contacto@mateogaviraghi.com">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 hover:border-slate-600 hover:bg-slate-800/50"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contáctame
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-8">
            <a
              href="https://github.com/MateoGaviraghi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110 border border-slate-700/50"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/mateo-gaviraghi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110 border border-slate-700/50"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contacto@mateogaviraghi.com"
              className="w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110 border border-slate-700/50"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Stats/Features Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-500/10">
            <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Clean Code</h3>
            <p className="text-slate-400">
              Código limpio, escalable y mantenible siguiendo las mejores
              prácticas de la industria.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">AI Powered</h3>
            <p className="text-slate-400">
              Integración de inteligencia artificial para crear experiencias
              innovadoras y personalizadas.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Performance</h3>
            <p className="text-slate-400">
              Optimizado para velocidad y rendimiento excepcional en todos los
              dispositivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
