import apiClient from "./client";
import { AIInsightInput } from "@/lib/validations/ai-insight.schemas";

export interface AIInsight {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  relatedProjectId?: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const aiInsightsAPI = {
  // ✅ GET /ai-insights - Público (solo públicos)
  getPublic: async (params?: { category?: string; limit?: number }) => {
    const { data } = await apiClient.get<AIInsight[]>("/ai-insights", {
      params,
    });
    return data;
  },

  // ✅ GET /ai-insights/all - Admin (todos los insights)
  getAll: async (params?: { category?: string; limit?: number }) => {
    const { data } = await apiClient.get<AIInsight[]>("/ai-insights/all", {
      params,
    });
    return data;
  },

  // ✅ GET /ai-insights/top - Top insights
  getTop: async (limit = 5) => {
    const { data } = await apiClient.get<AIInsight[]>(
      `/ai-insights/top?limit=${limit}`
    );
    return data;
  },

  // ✅ GET /ai-insights/:id - Por ID
  getById: async (id: string) => {
    const { data } = await apiClient.get<AIInsight>(`/ai-insights/${id}`);
    return data;
  },

  // ✅ POST /ai-insights - Autenticado (crear insight)
  create: async (insightData: AIInsightInput) => {
    const { data } = await apiClient.post<AIInsight>(
      "/ai-insights",
      insightData
    );
    return data;
  },

  // ✅ PATCH /ai-insights/:id - Admin (actualizar)
  update: async (id: string, insightData: Partial<AIInsightInput>) => {
    const { data } = await apiClient.patch<AIInsight>(
      `/ai-insights/${id}`,
      insightData
    );
    return data;
  },

  // ✅ DELETE /ai-insights/:id - Admin (eliminar)
  delete: async (id: string) => {
    await apiClient.delete(`/ai-insights/${id}`);
  },

  // ✅ POST /ai-insights/:id/publish - Admin (publicar)
  publish: async (id: string) => {
    const { data } = await apiClient.post(`/ai-insights/${id}/publish`);
    return data;
  },

  // ✅ POST /ai-insights/:id/unpublish - Admin (despublicar)
  unpublish: async (id: string) => {
    const { data } = await apiClient.post(`/ai-insights/${id}/unpublish`);
    return data;
  },

  // Métodos adicionales opcionales
  getByCategory: async (category: string) => {
    const { data } = await apiClient.get<AIInsight[]>(
      `/ai-insights/category/${category}`
    );
    return data;
  },

  getMyInsights: async () => {
    const { data } = await apiClient.get<AIInsight[]>(
      "/ai-insights/my-insights"
    );
    return data;
  },
};
