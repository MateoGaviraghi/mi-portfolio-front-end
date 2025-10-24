import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "@/types";

// ===========================
// CONFIGURACIÓN BASE
// ===========================

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 30000, // 30 segundos
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Para CORS con cookies
});

// ===========================
// REQUEST INTERCEPTOR
// ===========================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Agregar token de acceso si existe
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log para desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ===========================
// RESPONSE INTERCEPTOR
// ===========================

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses en desarrollo
    if (process.env.NODE_ENV === "development") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${
          response.status
        }`
      );
    }

    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ===========================
    // MANEJO DE ERROR 401 (Unauthorized)
    // ===========================

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        console.log("🔄 Attempting to refresh token...");

        // Intentar refrescar el token
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // Guardar nuevos tokens
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        console.log("✅ Token refreshed successfully");

        // Reintentar request original con nuevo token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);

        // Limpiar tokens y redirigir
        handleAuthFailure();

        return Promise.reject(refreshError);
      }
    }

    // ===========================
    // MANEJO DE OTROS ERRORES
    // ===========================

    handleApiError(error);

    return Promise.reject(error);
  }
);

// ===========================
// HELPER FUNCTIONS
// ===========================

/**
 * Maneja fallos de autenticación
 */
function handleAuthFailure(): void {
  // Limpiar storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  // Mostrar notificación
  toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");

  // Redirigir a login (solo en el cliente)
  if (typeof window !== "undefined") {
    // Delay para que el toast se muestre antes del redirect
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
}

/**
 * Maneja errores de API y muestra notificaciones
 */
function handleApiError(error: AxiosError<ApiError>): void {
  let message = "Ocurrió un error inesperado";

  if (error.response?.data) {
    const apiError = error.response.data;

    // Si el message es un array (validación), tomar el primero
    if (Array.isArray(apiError.message)) {
      message = apiError.message[0];
    } else if (typeof apiError.message === "string") {
      message = apiError.message;
    }
  } else if (error.message) {
    message = error.message;
  }

  // No mostrar error si es 401 (se maneja en el interceptor)
  if (error.response?.status !== 401) {
    toast.error(message);
  }

  // Log detallado en desarrollo
  if (process.env.NODE_ENV === "development") {
    console.error("❌ API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      message,
      fullError: error,
    });
  }
}

// ===========================
// EXPORT
// ===========================

export default apiClient;

// Re-export tipos útiles
export type { AxiosResponse, AxiosError };
