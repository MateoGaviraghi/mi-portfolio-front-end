import apiClient from "./client";
import { ProjectInput } from "@/lib/validations/project.schemas";

export const adminProjectsAPI = {
  create: async (data: ProjectInput) => {
    const { data: result } = await apiClient.post("/projects", data);
    return result;
  },

  update: async (id: string, data: Partial<ProjectInput>) => {
    const { data: result } = await apiClient.patch(`/projects/${id}`, data);
    return result;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/projects/${id}`);
  },

  uploadImage: async (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(
      `/upload/project/${projectId}/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  uploadVideo: async (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(
      `/upload/project/${projectId}/video`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  deleteImage: async (projectId: string, publicId: string) => {
    await apiClient.delete(
      `/upload/project/${projectId}/image/${encodeURIComponent(publicId)}`
    );
  },

  deleteVideo: async (projectId: string, publicId: string) => {
    await apiClient.delete(
      `/upload/project/${projectId}/video/${encodeURIComponent(publicId)}`
    );
  },
};
