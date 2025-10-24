"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsAPI, Review } from "@/lib/api/reviews.api";
import { useReviewMutations } from "@/hooks/useReviewMutations";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  Star,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function AdminReviewsPage() {
  const [backendError, setBackendError] = useState(false);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews-all"],
    queryFn: async () => {
      try {
        const data = await reviewsAPI.getAll();
        setBackendError(false);
        return data;
      } catch (error: unknown) {
        // Si es error 401, el usuario no tiene permisos de admin
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status === 401) {
          console.warn(
            "Usuario sin permisos de admin, usando endpoint público"
          );
          try {
            const data = await reviewsAPI.getApproved();
            setBackendError(false);
            return data;
          } catch {
            console.error("Backend de reviews no disponible");
            setBackendError(true);
            return [];
          }
        }

        // Si es otro error, intentar fallback
        try {
          console.warn(
            "Endpoint /reviews/all no disponible, intentando /reviews"
          );
          const data = await reviewsAPI.getApproved();
          setBackendError(false);
          return data;
        } catch {
          console.error("Backend de reviews no disponible");
          setBackendError(true);
          return [];
        }
      }
    },
    retry: false,
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

  // ✅ Filtros usando isPublic (true = aprobada, false = pendiente)
  const approvedReviews = reviews?.filter((r) => r.isPublic) || [];
  const pendingReviews = reviews?.filter((r) => !r.isPublic) || [];

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
                <p className="text-slate-400 text-sm mb-1">Rating Promedio</p>
                <p className="text-3xl font-bold text-amber-500">
                  {reviews && reviews.length > 0
                    ? (
                        reviews.reduce((acc, r) => acc + r.rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : backendError ? (
          /* Backend Error Message */
          <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-amber-400 mb-2">
              Módulo de Reviews no disponible
            </h3>
            <p className="text-slate-300 mb-4">
              El backend aún no tiene implementado el módulo de reviews.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4 text-left max-w-2xl mx-auto">
              <p className="text-sm text-slate-400 mb-2">
                <strong className="text-white">Endpoints necesarios:</strong>
              </p>
              <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                <li>
                  <code className="text-primary-400">GET /reviews</code> -
                  Obtener reviews aprobadas (público)
                </li>
                <li>
                  <code className="text-primary-400">GET /reviews/all</code> -
                  Obtener todas las reviews (admin)
                </li>
                <li>
                  <code className="text-primary-400">POST /reviews</code> -
                  Crear nueva review
                </li>
                <li>
                  <code className="text-primary-400">
                    POST /reviews/:id/approve
                  </code>{" "}
                  - Aprobar review
                </li>
                <li>
                  <code className="text-primary-400">
                    POST /reviews/:id/reject
                  </code>{" "}
                  - Rechazar review
                </li>
                <li>
                  <code className="text-primary-400">DELETE /reviews/:id</code>{" "}
                  - Eliminar review
                </li>
              </ul>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Una vez implementados estos endpoints, esta página funcionará
              automáticamente.
            </p>
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
  // ✅ Convertir isPublic a estado legible
  const getStatusColor = () => {
    return review.isPublic
      ? "bg-green-500/20 text-green-400 border-green-500/50"
      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
  };

  const getStatusText = () => {
    return review.isPublic ? "Aprobada" : "Pendiente";
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
              className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor()}`}
            >
              {getStatusText()}
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
          {/* Mostrar botones aprobar/rechazar solo si NO está aprobada */}
          {!review.isPublic && (
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
          {/* Botón eliminar siempre disponible */}
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
