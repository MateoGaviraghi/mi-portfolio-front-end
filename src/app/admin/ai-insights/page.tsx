"use client";

import { useQuery } from "@tanstack/react-query";
import { aiInsightsAPI, AIInsight } from "@/lib/api/ai-insights.api";
import { useAIInsightMutations } from "@/hooks/useAIInsightMutations";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminAIInsightsPage() {
  const [backendError, setBackendError] = useState(false);

  const { data: insights, isLoading } = useQuery({
    queryKey: ["ai-insights-all"],
    queryFn: async () => {
      try {
        // ⚠️ WORKAROUND: Backend tiene problema de orden de rutas
        // GET /ai-insights/all está siendo capturado por GET /ai-insights/:id
        // Usamos el endpoint público hasta que se arregle el backend
        const data = await aiInsightsAPI.getPublic();
        setBackendError(false);
        return data;
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError?.response?.status === 401) {
          console.warn("Usuario sin permisos de admin");
        }
        console.error("Backend de AI Insights no disponible");
        setBackendError(true);
        return [];
      }
    },
    retry: false,
  });

  const { publishInsight, unpublishInsight, deleteInsight } =
    useAIInsightMutations();

  const handleTogglePublish = async (insight: AIInsight) => {
    if (insight.isPublic) {
      await unpublishInsight.mutateAsync(insight._id);
    } else {
      await publishInsight.mutateAsync(insight._id);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`¿Eliminar insight "${title}"?`)) {
      await deleteInsight.mutateAsync(id);
    }
  };

  const publicInsights = insights?.filter((i) => i.isPublic) || [];
  const draftInsights = insights?.filter((i) => !i.isPublic) || [];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
              AI Insights
            </h1>
            <p className="text-slate-400">
              Gestiona tus insights técnicos y aprendizajes
            </p>
          </div>
          <Link href="/admin/ai-insights/new">
            <Button className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Crear Insight
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold text-white">
                  {insights?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Publicados</p>
                <p className="text-3xl font-bold text-green-500">
                  {publicInsights.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Borradores</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {draftInsights.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : backendError ? (
          <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-amber-400 mb-2">
              Módulo de AI Insights no disponible
            </h3>
            <p className="text-slate-300 mb-4">
              El backend aún no tiene implementado el módulo de AI Insights.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Borradores */}
            {draftInsights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                  <EyeOff className="w-5 h-5" />
                  Borradores
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {draftInsights.map((insight) => (
                    <InsightCard
                      key={insight._id}
                      insight={insight}
                      onTogglePublish={handleTogglePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Publicados */}
            {publicInsights.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Publicados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publicInsights.map((insight) => (
                    <InsightCard
                      key={insight._id}
                      insight={insight}
                      onTogglePublish={handleTogglePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {!insights ||
              (insights.length === 0 && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-12 text-center">
                  <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-300 mb-2">
                    No hay insights todavía
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Crea tu primer insight técnico
                  </p>
                  <Link href="/admin/ai-insights/new">
                    <Button className="bg-gradient-to-r from-primary-500 to-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Primer Insight
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface InsightCardProps {
  insight: AIInsight;
  onTogglePublish: (insight: AIInsight) => void;
  onDelete: (id: string, title: string) => void;
}

function InsightCard({ insight, onTogglePublish, onDelete }: InsightCardProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg mb-2">{insight.title}</h3>
          <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold">
            {insight.category}
          </span>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
        {insight.content}
      </p>

      {insight.tags && insight.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {insight.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-slate-500"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          {new Date(insight.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        <div className="flex gap-2">
          <Link href={`/admin/ai-insights/${insight._id}/edit`}>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onTogglePublish(insight)}
            className={insight.isPublic ? "text-green-400" : "text-slate-400"}
          >
            {insight.isPublic ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(insight._id, insight.title)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
