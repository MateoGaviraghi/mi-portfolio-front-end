import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                M
              </div>
              <span className="font-bold text-xl text-white">Mi Portfolio</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Desarrollador Full Stack apasionado por crear experiencias web
              excepcionales con las tecnologías más modernas.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Navegación</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="/projects"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                Proyectos
              </a>
              <a
                href="/skills"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                Skills
              </a>
              <a
                href="/ai-insights"
                className="text-slate-400 hover:text-primary-500 transition-colors text-sm"
              >
                AI Insights
              </a>
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Conecta conmigo</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:tu@email.com"
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Todos los derechos reservados.
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              y Next.js
            </span>
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
