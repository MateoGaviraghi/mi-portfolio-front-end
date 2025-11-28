"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewInput } from "@/lib/validations/review.schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  onSubmit: (data: ReviewInput) => void;
  isLoading?: boolean;
}

export function ReviewForm({ onSubmit, isLoading }: Props) {
  const [rating, setRating] = useState(5);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValue("rating", newRating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nombre Completo
          </label>
          <Input
            {...register("name")}
            placeholder="Juan Pérez"
            className="bg-background/50 border-border focus:border-secondary"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Posición */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Posición
          </label>
          <Input
            {...register("position")}
            placeholder="Senior Developer"
            className="bg-background/50 border-border focus:border-secondary"
          />
          {errors.position && (
            <p className="text-destructive text-sm mt-1">
              {errors.position.message}
            </p>
          )}
        </div>
      </div>

      {/* Empresa */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Empresa
        </label>
        <Input
          {...register("company")}
          placeholder="Tech Company Inc."
          className="bg-background/50 border-border focus:border-secondary"
        />
        {errors.company && (
          <p className="text-destructive text-sm mt-1">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Calificación
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted/50"
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-destructive text-sm mt-1">
            {errors.rating.message}
          </p>
        )}
      </div>

      {/* Comentario */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Tu Comentario
        </label>
        <textarea
          {...register("content")}
          placeholder="Comparte tu experiencia trabajando conmigo..."
          className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
          rows={5}
        />
        {errors.content && (
          <p className="text-destructive text-sm mt-1">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Avatar URL (opcional)
        </label>
        <Input
          {...register("avatar")}
          placeholder="https://example.com/avatar.jpg"
          className="bg-background/50 border-border focus:border-secondary"
        />
        {errors.avatar && (
          <p className="text-destructive text-sm mt-1">
            {errors.avatar.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
      >
        Enviar Review
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Tu review será revisada antes de ser publicada
      </p>
    </form>
  );
}
