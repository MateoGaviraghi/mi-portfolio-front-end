"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { MobileMenu } from "./MobileMenu";
import { AdminDropdown } from "./AdminDropdown";
import { Menu, Github, Linkedin, Mail } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo con animación */}
          <Link href="/" className="group flex items-center gap-3 relative">
            <div className="relative">
              <div className="absolute -inset-2 bg-linear-to-r from-primary-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 bg-linear-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                M
              </div>
            </div>
            <span className="font-bold text-xl bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Mi Portfolio
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/projects"
              className="text-slate-300 hover:text-white transition-colors relative group"
            >
              Proyectos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link
              href="/skills"
              className="text-slate-300 hover:text-white transition-colors relative group"
            >
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link
              href="/reviews"
              className="text-slate-300 hover:text-white transition-colors relative group"
            >
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all"></span>
            </Link>

            {/* Dropdown Admin solo si el usuario es admin */}
            {isAuthenticated && user?.role === "admin" && <AdminDropdown />}
          </nav>

          {/* Auth & Social */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:tu@email.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-slate-300 text-sm">{user?.name}</span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-slate-700 hover:border-slate-600"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-300">
                    Iniciar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-linear-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden text-white p-2"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
