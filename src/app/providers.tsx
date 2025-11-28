"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// ===========================
// QUERY CLIENT SETUP
// ===========================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // No reintentar en errores 401, 403, 404
        const status = (error as { response?: { status?: number } })?.response
          ?.status;
        if (status === 401 || status === 403 || status === 404) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// ===========================
// AUTH INITIALIZER COMPONENT
// ===========================

// ===========================
// MAIN PROVIDERS COMPONENT
// ===========================

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1E293B", // slate-800
            color: "#F8FAFC", // slate-50
            borderRadius: "0.75rem", // rounded-xl
            border: "1px solid #334155", // slate-700
            fontSize: "0.875rem", // text-sm
            padding: "12px 16px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            iconTheme: {
              primary: "#10B981", // green-500
              secondary: "#F8FAFC", // slate-50
            },
            style: {
              border: "1px solid #10B981",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444", // red-500
              secondary: "#F8FAFC", // slate-50
            },
            style: {
              border: "1px solid #EF4444",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3B82F6", // blue-500
              secondary: "#F8FAFC", // slate-50
            },
            style: {
              border: "1px solid #3B82F6",
            },
          },
        }}
      />

      {/* React Query Devtools (solo en desarrollo) */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
