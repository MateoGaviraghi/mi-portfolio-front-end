import apiClient from "./client";
import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  RefreshResponse,
  User,
} from "@/types";

// ===========================
// AUTH API SERVICE
// ===========================

export const authAPI = {
  /**
   * Registrar nuevo usuario
   */
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        data
      );

      // Guardar tokens y usuario automáticamente
      const { user, tokens } = response.data;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("✅ User registered and tokens saved");

      return response.data;
    } catch (error) {
      console.error("❌ Registration failed:", error);
      throw error;
    }
  },

  /**
   * Iniciar sesión
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", data);

      // Guardar tokens y usuario automáticamente
      const { user, tokens } = response.data;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("✅ User logged in and tokens saved");

      return response.data;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      // Llamar al endpoint de logout si hay refresh token
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
        console.log("✅ Logout endpoint called");
      }
    } catch (error) {
      // No lanzar error aquí, siempre limpiar storage
      console.warn(
        "⚠️ Logout endpoint failed, but continuing with cleanup:",
        error
      );
    } finally {
      // Siempre limpiar storage local
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      console.log("✅ Local storage cleared");
    }
  },

  /**
   * Refrescar tokens (usado internamente por el interceptor)
   */
  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    try {
      const response = await apiClient.post<RefreshResponse>("/auth/refresh", {
        refreshToken,
      });

      console.log("✅ Tokens refreshed via API");

      return response.data;
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      throw error;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  checkAuth: (): { isAuthenticated: boolean; user: User | null } => {
    try {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        return { isAuthenticated: false, user: null };
      }

      const user = JSON.parse(userStr) as User;

      return { isAuthenticated: true, user };
    } catch (error) {
      console.error("❌ Auth check failed:", error);

      // Limpiar storage corrupto
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      return { isAuthenticated: false, user: null };
    }
  },

  /**
   * Obtener token actual
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  /**
   * Obtener refresh token actual
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("❌ Failed to get current user:", error);
      return null;
    }
  },

  /**
   * Verificar si el usuario es admin
   */
  isAdmin: (): boolean => {
    const user = authAPI.getCurrentUser();
    return user?.role === "admin";
  },

  /**
   * Limpiar toda la data de autenticación
   */
  clearAuth: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    console.log("✅ Auth data cleared");
  },
};

// ===========================
// EXPORT DEFAULT
// ===========================

export default authAPI;
