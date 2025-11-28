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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Lo que dicen sobre mí
            </span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 px-2 sm:px-0">
            Testimonios de clientes y colegas con quienes he trabajado
          </p>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dejar una Review
            </Button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Nueva Review
              </h2>
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground"
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
            <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Aún no hay reviews
            </h3>
            <p className="text-muted-foreground mb-6">
              Sé el primero en dejar un comentario
            </p>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
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
