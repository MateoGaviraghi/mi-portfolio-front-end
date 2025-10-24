"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { MobileMenu } from "./MobileMenu";
export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <header className="w-full border-b bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          MiPortfolio
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/projects">Proyectos</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/ai-insights">AI</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline">{user?.name}</span>
              <Button variant="outline" onClick={logout}>
                Salir
              </Button>
            </>
          ) : (
            <div className="hidden sm:flex gap-2">
              <Link href="/login">
                <Button variant="ghost">Iniciar</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
