import apiClient from "./client";
import { ReviewInput } from "@/lib/validations/review.schemas";

export interface Review {
  _id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const reviewsAPI = {
  // Público
  getApproved: async () => {
    const { data } = await apiClient.get<Review[]>("/reviews");
    return data;
  },

  create: async (data: ReviewInput) => {
    const { data: result } = await apiClient.post<Review>("/reviews", data);
    return result;
  },

  // Admin
  getAll: async () => {
    const { data } = await apiClient.get<Review[]>("/reviews/all");
    return data;
  },

  approve: async (id: string) => {
    await apiClient.post(`/reviews/${id}/approve`);
  },

  reject: async (id: string) => {
    await apiClient.post(`/reviews/${id}/reject`);
  },

  delete: async (id: string) => {
    await apiClient.delete(`/reviews/${id}`);
  },
};
