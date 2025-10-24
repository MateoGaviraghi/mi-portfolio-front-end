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
  isPublic: boolean; // ✅ Campo correcto del backend
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const reviewsAPI = {
  // ✅ GET /reviews - Público (solo aprobadas)
  getApproved: async () => {
    const { data } = await apiClient.get<Review[]>("/reviews");
    return data;
  },

  // ✅ POST /reviews - Autenticado (crear review)
  create: async (reviewData: ReviewInput) => {
    const { data } = await apiClient.post<Review>("/reviews", reviewData);
    return data;
  },

  // ✅ GET /reviews/all - Admin (todas las reviews)
  getAll: async () => {
    const { data } = await apiClient.get<Review[]>("/reviews/all");
    return data;
  },

  // ✅ POST /reviews/:id/approve - Admin (aprobar)
  approve: async (id: string) => {
    const { data } = await apiClient.post(`/reviews/${id}/approve`);
    return data;
  },

  // ✅ POST /reviews/:id/reject - Admin (rechazar)
  reject: async (id: string) => {
    const { data } = await apiClient.post(`/reviews/${id}/reject`);
    return data;
  },

  // ✅ DELETE /reviews/:id - Admin (eliminar)
  delete: async (id: string) => {
    await apiClient.delete(`/reviews/${id}`);
  },

  // Endpoints adicionales disponibles (opcionales)
  getById: async (id: string) => {
    const { data } = await apiClient.get<Review>(`/reviews/${id}`);
    return data;
  },

  getMyReviews: async () => {
    const { data } = await apiClient.get<Review[]>("/reviews/my-reviews");
    return data;
  },

  getStats: async () => {
    const { data } = await apiClient.get("/reviews/stats");
    return data;
  },
};
