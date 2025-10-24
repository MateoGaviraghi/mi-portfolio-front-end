import apiClient from "./client";
import { SkillInput } from "@/lib/validations/skill.schemas";

export const adminSkillsAPI = {
  create: async (data: SkillInput) => {
    const { data: result } = await apiClient.post("/skills", data);
    return result;
  },

  update: async (id: string, data: Partial<SkillInput>) => {
    const { data: result } = await apiClient.patch(`/skills/${id}`, data);
    return result;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/skills/${id}`);
  },
};
