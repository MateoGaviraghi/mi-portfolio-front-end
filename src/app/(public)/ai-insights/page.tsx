"use client";
import { useQuery } from "@tanstack/react-query";
import { aiInsightsAPI } from "@/lib/api/ai-insights.api";
import { Loader2, Sparkles, Calendar, Tag } from "lucide-react";

export default function AIInsightsPage() {
  const {
    data: insights,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ai-insights"],
    queryFn: () => aiInsightsAPI.getPublic(),
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                AI Insights
              </h1>
              <p className="text-slate-400 mt-1">
                Análisis y recomendaciones generadas por IA
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto" />
              <p className="text-slate-400">Cargando insights...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Error al cargar los insights. Intenta nuevamente.
            </p>
          </div>
        )}

        {/* Insights List */}
        {!isLoading && !error && insights && (
          <div className="space-y-6">
            {insights.map((insight) => (
              <article
                key={insight._id}
                className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white group-hover:text-primary-400 transition-colors mb-2">
                      {insight.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(insight.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>

                      {insight.category && (
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-md text-xs font-medium border border-primary-500/30">
                          {insight.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <Sparkles className="w-6 h-6 text-primary-500 shrink-0" />
                </div>

                {/* Content */}
                <p className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                  {insight.content}
                </p>

                {/* Tags */}
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-800">
                    <Tag className="w-4 h-4 text-slate-500" />
                    {insight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-800/80 text-slate-400 text-xs rounded-full hover:bg-slate-800 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!insights || insights.length === 0) && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">
              No hay insights disponibles aún.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Los insights generados por IA aparecerán aquí.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-linear-to-r from-primary-500/10 to-purple-600/10 border border-primary-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">
                ¿Qué son los AI Insights?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Son análisis, recomendaciones y observaciones generadas
                automáticamente por inteligencia artificial sobre mis proyectos,
                código y tecnologías. Estos insights ayudan a identificar
                patrones, mejoras potenciales y tendencias en mi trabajo de
                desarrollo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
