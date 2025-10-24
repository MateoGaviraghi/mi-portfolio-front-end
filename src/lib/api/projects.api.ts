import apiClient from "./client";

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  images: Array<{ url: string; publicId: string; alt?: string }>;
  videos?: Array<{ url: string; publicId: string }>;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  likes?: number;
  views?: number;
  createdAt: string;
}

export const projectsAPI = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await apiClient.get<{
      data: Project[];
      total: number;
      page: number;
    }>("/projects", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Project>(`/projects/${id}`);
    return data;
  },

  search: async (query: string) => {
    const { data } = await apiClient.get<Project[]>(
      `/projects/search?q=${query}`
    );
    return data;
  },

  like: async (id: string) => {
    const { data } = await apiClient.post(`/projects/${id}/like`);
    return data;
  },
};
