import apiClient from "./client";

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number; // 0-100
  icon?: string;
  description?: string;
}

export const skillsAPI = {
  getAll: async () => {
    const { data } = await apiClient.get<Skill[]>("/skills");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Skill>(`/skills/${id}`);
    return data;
  },

  getStats: async () => {
    const { data } = await apiClient.get("/skills/stats");
    return data;
  },
};
