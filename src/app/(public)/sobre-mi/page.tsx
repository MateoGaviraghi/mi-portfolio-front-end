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
      <div className="relative pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-600/20 border border-primary-500/30 mb-4">
              <span className="text-sm bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Conoce mi trayectoria
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent">
                Sobre Mí
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Full Stack Developer con pasión por crear soluciones innovadoras
            </p>
          </div>

          <AboutSection />
        </div>
      </div>
    </div>
  );
}
