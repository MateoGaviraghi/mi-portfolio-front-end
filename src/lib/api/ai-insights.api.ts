import apiClient from "./client";

export interface AIInsight {
  _id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  projectId?: string;
  createdAt: string;
}

export const aiInsightsAPI = {
  getAll: async (params?: { category?: string; limit?: number }) => {
    const { data } = await apiClient.get<AIInsight[]>("/ai-insights", {
      params,
    });
    return data;
  },

  getTop: async (limit = 5) => {
    const { data } = await apiClient.get<AIInsight[]>(
      `/ai-insights/top?limit=${limit}`
    );
    return data;
  },
};
