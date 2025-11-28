"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewsAPI } from "@/lib/api/reviews.api";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useReviewMutations } from "@/hooks/useReviewMutations";
import { ReviewInput } from "@/lib/validations/review.schemas";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, MessageSquare } from "lucide-react";

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewsAPI.getApproved(),
  });

  const { createReview } = useReviewMutations();

  const handleSubmit = async (data: ReviewInput) => {
    await createReview.mutateAsync(data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 sm:pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Lo que dicen sobre mí
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 px-2 sm:px-0">
            Testimonios de clientes y colegas con quienes he trabajado
          </p>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dejar una Review
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Nueva Review</h2>
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="text-slate-400"
              >
                Cancelar
              </Button>
            </div>
            <ReviewForm
              onSubmit={handleSubmit}
              isLoading={createReview.isPending}
            />
          </div>
        )}

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              Aún no hay reviews
            </h3>
            <p className="text-slate-500 mb-6">
              Sé el primero en dejar un comentario
            </p>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-primary-500 to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dejar la primera review
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
