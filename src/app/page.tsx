"use client";

import { useAuthStore } from "@/lib/store/authStore";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          FASE 1 - API Client & Autenticacion
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            Estado de Autenticacion
          </h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <div>
              <p className="mb-2">
                <strong>Estado:</strong>{" "}
                {isAuthenticated ? "Autenticado" : "No autenticado"}
              </p>
              {user && (
                <>
                  <p className="mb-2">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="mb-2">
                    <strong>Nombre:</strong> {user.name}
                  </p>
                  <p className="mb-2">
                    <strong>Rol:</strong> {user.role}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Completado</h2>
          <ul className="space-y-2">
            <li>✓ API Client con Axios</li>
            <li>✓ Interceptors JWT</li>
            <li>✓ Refresh Token automatico</li>
            <li>✓ Zustand Store</li>
            <li>✓ Types TypeScript</li>
            <li>✓ React Query</li>
            <li>✓ Toast Notifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
