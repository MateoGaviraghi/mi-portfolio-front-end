"use client";

import { Review } from "@/lib/api/reviews.api";
import { Star } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition-all">
      <div className="flex items-center gap-4">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/30"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
            {review.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="font-bold text-white">{review.name}</h3>
          <p className="text-sm text-slate-400">
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
                : "text-slate-700"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-300 leading-relaxed">{review.content}</p>

      {/* Date */}
      <p className="text-xs text-slate-500">
        {new Date(review.createdAt).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
