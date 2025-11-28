"use client";

import { Review } from "@/lib/api/reviews.api";
import { Star } from "lucide-react";
import Image from "next/image";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-4 hover:border-secondary transition-all">
      <div className="flex items-center gap-4">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover border-2 border-secondary/30"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl border border-secondary/20">
            {review.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="font-bold text-foreground">{review.name}</h3>
          <p className="text-sm text-muted-foreground">
            {review.position} en {review.company}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < review.rating
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-muted-foreground leading-relaxed">{review.content}</p>

      {/* Date */}
      <p className="text-xs text-muted-foreground/60">
        {new Date(review.createdAt).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
