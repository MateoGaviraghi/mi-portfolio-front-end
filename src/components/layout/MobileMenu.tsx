"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isAuthenticated, logout, user } = useAuthStore();

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
            <Link href="/skills" onClick={onClose}>
              Skills
            </Link>
            <Link href="/ai-insights" onClick={onClose}>
              AI
            </Link>

            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/admin/dashboard"
                onClick={onClose}
                className="text-primary-500 font-medium flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
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
