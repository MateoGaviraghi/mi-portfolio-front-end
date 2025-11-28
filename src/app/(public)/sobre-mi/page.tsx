import { AboutSection } from "@/components/home/AboutSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí | Mateo Gaviraghi",
  description:
    "Full Stack Developer especializado en React, Next.js, NestJS, Node.js, TypeScript e IA. Conoce más sobre mi experiencia y habilidades.",
};

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative pt-20 sm:pt-24 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-600/20 border border-primary-500/30 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Conoce mi trayectoria
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent">
                Sobre Mí
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto px-2 sm:px-0">
              Full Stack Developer con pasión por crear soluciones innovadoras
            </p>
          </div>

          <AboutSection />
        </div>
      </div>
    </div>
  );
}
