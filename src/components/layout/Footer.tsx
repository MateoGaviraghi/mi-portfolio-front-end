import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div className="space-y-3 md:space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                M
              </div>
              <span className="font-bold text-lg md:text-xl text-white">
                Mateo Gaviraghi
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Desarrollador Full Stack apasionado por crear experiencias web
              excepcionales con las tecnologías más modernas.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 md:space-y-4 text-center sm:text-left">
            <h3 className="text-white font-semibold">Navegación</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/projects"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                Proyectos
              </Link>
              <Link
                href="/skills"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                Skills
              </Link>
              <Link
                href="/reviews"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                Reviews
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3 md:space-y-4 text-center sm:text-left">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="flex justify-center sm:justify-start gap-3">
              <a
                href="https://github.com/MateoGaviraghi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mateo-gaviraghi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/mateogaviraghi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contacto@mateogaviraghi.com"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Mateo Gaviraghi. Todos los derechos
            reservados.
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              y Next.js
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
