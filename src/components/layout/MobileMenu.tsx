"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  Shield,
  ChevronDown,
  LayoutDashboard,
  Folder,
  Wrench,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Menu</h3>
            <button onClick={onClose} aria-label="Cerrar">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={onClose}>
              Inicio
            </Link>
            <Link href="/projects" onClick={onClose}>
              Proyectos
            </Link>
            <Link href="/sobre-mi" onClick={onClose}>
              Sobre Mí
            </Link>
            <Link href="/skills" onClick={onClose}>
              Skills
            </Link>
            <Link href="/reviews" onClick={onClose}>
              Reviews
            </Link>
            <Link href="/contacto" onClick={onClose}>
              Contacto
            </Link>

            {/* Admin Menu Desplegable */}
            {isAuthenticated && user?.role === "admin" && (
              <div className="border-t border-slate-800 pt-3 mt-2">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="w-full flex items-center justify-between text-primary-500 font-medium py-2"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      adminMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {adminMenuOpen && (
                  <div className="ml-6 mt-2 space-y-2 border-l-2 border-primary-500/30 pl-3">
                    <Link
                      href="/admin/dashboard"
                      onClick={onClose}
                      className="flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/admin/projects"
                      onClick={onClose}
                      className="flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5"
                    >
                      <Folder className="w-4 h-4" />
                      <span>Proyectos</span>
                    </Link>
                    <Link
                      href="/admin/skills"
                      onClick={onClose}
                      className="flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>Skills</span>
                    </Link>
                    <Link
                      href="/admin/reviews"
                      onClick={onClose}
                      className="flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Reviews</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated ? (
              <>
                <span className="pt-4">{user?.name}</span>
                <button
                  className="text-left text-red-600"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={onClose}>
                  Iniciar sesión
                </Link>
                <Link href="/register" onClick={onClose}>
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      </Dialog>
    </Transition>
  );
}
