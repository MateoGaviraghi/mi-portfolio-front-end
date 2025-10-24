import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsAPI } from "@/lib/api/reviews.api";
import { ReviewInput } from "@/lib/validations/review.schemas";
import toast from "react-hot-toast";

export function useReviewMutations() {
  const queryClient = useQueryClient();

  const createReview = useMutation({
    mutationFn: (data: ReviewInput) => reviewsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review enviada. Será revisada antes de publicarse.");
    },
    onError: () => toast.error("Error al enviar review"),
  });

  const approveReview = useMutation({
    mutationFn: (id: string) => reviewsAPI.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review aprobada");
    },
    onError: () => toast.error("Error al aprobar review"),
  });

  const rejectReview = useMutation({
    mutationFn: (id: string) => reviewsAPI.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review rechazada");
    },
    onError: () => toast.error("Error al rechazar review"),
  });

  const deleteReview = useMutation({
    mutationFn: (id: string) => reviewsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Review eliminada");
    },
    onError: () => toast.error("Error al eliminar review"),
  });

  return { createReview, approveReview, rejectReview, deleteReview };
}
