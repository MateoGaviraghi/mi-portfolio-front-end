"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    checkAuth();
    return () => clearTimeout(timer);
  }, [checkAuth]);

  // Mostrar loading mientras se verifica la autenticación
  if (!mounted || !isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
