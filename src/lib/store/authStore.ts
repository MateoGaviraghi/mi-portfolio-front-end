import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, LoginDto, RegisterDto } from "@/types";
import { authAPI } from "../api/auth.api";

// ===========================
// TYPES
// ===========================

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

// ===========================
// ZUSTAND STORE
// ===========================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ===========================
      // INITIAL STATE
      // ===========================
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isInitialized: false,

      // ===========================
      // ACTIONS
      // ===========================

      /**
       * Iniciar sesión
       */
      login: async (credentials: LoginDto) => {
        set({ isLoading: true, error: null });

        try {
          const data = await authAPI.login(credentials);

          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log("✅ Login successful in store");
        } catch (error) {
          const errorMessage =
            (
              error as {
                response?: { data?: { message?: string } };
                message?: string;
              }
            ).response?.data?.message ||
            (error as Error).message ||
            "Error al iniciar sesión";

          set({
            error: errorMessage,
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });

          console.error("❌ Login failed in store:", errorMessage);
          throw error;
        }
      },

      /**
       * Registrar usuario
       */
      register: async (data: RegisterDto) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.register(data);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log("✅ Registration successful in store");
        } catch (error) {
          const errorMessage =
            (
              error as {
                response?: { data?: { message?: string } };
                message?: string;
              }
            ).response?.data?.message ||
            (error as Error).message ||
            "Error al registrarse";

          set({
            error: errorMessage,
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });

          console.error("❌ Registration failed in store:", errorMessage);
          throw error;
        }
      },

      /**
       * Cerrar sesión
       */
      logout: async () => {
        set({ isLoading: true });

        try {
          await authAPI.logout();

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          console.log("✅ Logout successful in store");
        } catch (error) {
          console.error("❌ Logout error in store:", error);

          // Incluso si falla, limpiar el estado local
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      /**
       * Establecer usuario manualmente
       */
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        });

        console.log("✅ User set manually in store:", user?.email || "null");
      },

      /**
       * Verificar autenticación existente (desde localStorage)
       * TODO: Implementar endpoint /auth/me en el backend para validación real
       */
      checkAuth: async () => {
        const token = localStorage.getItem("accessToken");
        const userStr = localStorage.getItem("user");

        if (!token || !userStr) {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            error: null,
          });
          console.log("⚠️ No tokens found, user not authenticated");
          return;
        }

        try {
          // Parsear usuario desde localStorage
          const user = JSON.parse(userStr);

          set({
            user,
            isAuthenticated: true,
            isInitialized: true,
            error: null,
          });

          console.log("✅ Auth checked from localStorage:", user.email);

          // TODO: Cuando implementes /auth/me en el backend, descomentar esto:
          // const backendUser = await authAPI.me();
          // localStorage.setItem("user", JSON.stringify(backendUser));
          // set({ user: backendUser });
        } catch (error) {
          console.error("❌ Auth check failed:", error);

          // Limpiar tokens si hay error
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            error: null,
          });
        }
      }
      /**
       * Limpiar error
       */,
      clearError: () => {
        set({ error: null });
      },

      /**
       * Establecer loading manualmente
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      /**
       * Inicializar store (llamar al montar la app)
       */
      initialize: async () => {
        const state = get();
        if (!state.isInitialized) {
          await state.checkAuth();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      // Solo persistir datos necesarios (no isLoading, error, etc.)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),

      // Rehidratar el store al cargar
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
          console.log("✅ Auth store rehydrated");
        }
      },
    }
  )
);

// ===========================
// SELECTORS (Opcional - para performance)
// ===========================

export const useAuth = () =>
  useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
  }));

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    register: state.register,
    logout: state.logout,
    clearError: state.clearError,
  }));

export const useIsAdmin = () =>
  useAuthStore((state) => state.user?.role === "admin");

export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
