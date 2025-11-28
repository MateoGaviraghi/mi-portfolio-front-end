"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cloud, Sprout, Cpu, FileCode } from "lucide-react";

const skills = {
  frontend: [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind CSS", icon: "🎨" },
  ],
  backend: [
    { name: "NestJS", icon: "🦅" },
    { name: "Node.js", icon: "🟢" },
    { name: "API REST", icon: "🔌" },
    { name: "TypeScript", icon: "📘" },
  ],
  tools: [
    { name: "Cloudinary", icon: "☁️" },
    { name: "Postman", icon: "📮" },
    { name: "IA/AI", icon: "🤖" },
    { name: "Git", icon: "🔀" },
  ],
};

export function AboutSection() {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Sobre Mí
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Desarrollador Full Stack apasionado por crear soluciones completas
            desde el frontend hasta el backend
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
              <p>
                Soy un{" "}
                <span className="text-primary-400 font-semibold">
                  Desarrollador Full Stack
                </span>{" "}
                especializado en la creación de aplicaciones web modernas y
                escalables, tanto en el lado del cliente como del servidor.
              </p>
              <p>
                Mi experiencia abarca desde el desarrollo de{" "}
                <span className="text-blue-400 font-semibold">
                  interfaces de usuario dinámicas con React y Next.js
                </span>
                , hasta la construcción de{" "}
                <span className="text-green-400 font-semibold">
                  APIs REST robustas con NestJS y Node.js
                </span>
                .
              </p>
              <p>
                Utilizo{" "}
                <span className="text-purple-400 font-semibold">
                  TypeScript
                </span>{" "}
                como lenguaje principal para garantizar código type-safe y
                mantenible en ambos extremos del stack.
              </p>
              <p>
                Además, integro tecnologías modernas como{" "}
                <span className="text-cyan-400 font-semibold">
                  Inteligencia Artificial
                </span>{" "}
                y servicios en la nube como{" "}
                <span className="text-orange-400 font-semibold">
                  Cloudinary
                </span>{" "}
                para crear experiencias innovadoras y eficientes.
              </p>
            </div>
          </motion.div>

          {/* Stats/Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-primary-500/50 transition-all">
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">Front-End</h3>
              <p className="text-slate-400 text-sm">
                React, Next.js, TypeScript
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">Back-End</h3>
              <p className="text-slate-400 text-sm">
                NestJS, Node.js, API REST
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">AI/IA</h3>
              <p className="text-slate-400 text-sm">
                Integración de IA en apps
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">Cloud</h3>
              <p className="text-slate-400 text-sm">
                Cloudinary, servicios web
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Frontend Skills */}
          <div className="bg-gradient-to-br from-primary-500/10 to-blue-600/10 border border-primary-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Frontend</h3>
            </div>
            <div className="space-y-2">
              {skills.frontend.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white">Backend</h3>
            </div>
            <div className="space-y-2">
              {skills.backend.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sprout className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Tools & Tech</h3>
            </div>
            <div className="space-y-2">
              {skills.tools.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <span className="text-xl">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
