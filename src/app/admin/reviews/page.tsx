"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsAPI, Review } from "@/lib/api/reviews.api";
import { useReviewMutations } from "@/hooks/useReviewMutations";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, Trash2, Clock, Star } from "lucide-react";

export default function AdminReviewsPage() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews-all"],
    queryFn: async () => {
      try {
        return await reviewsAPI.getAll();
      } catch (_err) {
        // Si falla getAll(), usar el endpoint público como fallback
        console.warn("Endpoint /reviews/all no disponible, usando /reviews");
        return await reviewsAPI.getApproved();
      }
    },
  });

  const { approveReview, rejectReview, deleteReview } = useReviewMutations();

  const handleApprove = async (id: string) => {
    await approveReview.mutateAsync(id);
  };

  const handleReject = async (id: string) => {
    await rejectReview.mutateAsync(id);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Eliminar review de "${name}"?`)) {
      await deleteReview.mutateAsync(id);
    }
  };

  const pendingReviews = reviews?.filter((r) => r.status === "pending") || [];
  const approvedReviews = reviews?.filter((r) => r.status === "approved") || [];
  const rejectedReviews = reviews?.filter((r) => r.status === "rejected") || [];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Gestión de Reviews
          </h1>
          <p className="text-slate-400">
            Aprueba, rechaza o elimina reviews de clientes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold text-white">
                  {reviews?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {pendingReviews.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Aprobadas</p>
                <p className="text-3xl font-bold text-green-500">
                  {approvedReviews.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Rechazadas</p>
                <p className="text-3xl font-bold text-red-500">
                  {rejectedReviews.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pendientes */}
            {pendingReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pendientes de Revisión
                </h2>
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <ReviewItem
                      key={review._id}
                      review={review}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Aprobadas */}
            {approvedReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Aprobadas
                </h2>
                <div className="space-y-4">
                  {approvedReviews.map((review) => (
                    <ReviewItem
                      key={review._id}
                      review={review}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rechazadas */}
            {rejectedReviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Rechazadas
                </h2>
                <div className="space-y-4">
                  {rejectedReviews.map((review) => (
                    <ReviewItem
                      key={review._id}
                      review={review}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {!reviews ||
              (reviews.length === 0 && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-12 text-center">
                  <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-300 mb-2">
                    No hay reviews todavía
                  </h3>
                  <p className="text-slate-500">
                    Las reviews enviadas aparecerán aquí para su revisión
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ReviewItemProps {
  review: Review;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

function ReviewItem({
  review,
  onApprove,
  onReject,
  onDelete,
}: ReviewItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {review.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-white">{review.name}</h3>
              <p className="text-sm text-slate-400">
                {review.position} en {review.company}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                review.status
              )}`}
            >
              {review.status === "approved"
                ? "Aprobada"
                : review.status === "rejected"
                ? "Rechazada"
                : "Pendiente"}
            </span>
          </div>

          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-slate-700"
                }`}
              />
            ))}
          </div>

          <p className="text-slate-300 mb-3">{review.content}</p>

          <p className="text-xs text-slate-500">
            {new Date(review.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          {review.status === "pending" && (
            <>
              <Button
                size="sm"
                onClick={() => onApprove(review._id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Aprobar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(review._id)}
                className="border-red-900/50 hover:border-red-800 text-red-400"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Rechazar
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(review._id, review.name)}
            className="border-red-900/50 hover:border-red-800 text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
