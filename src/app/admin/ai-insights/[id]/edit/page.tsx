"use client";

import { AIInsightForm } from "@/components/admin/AIInsightForm";
import { useAIInsightMutations } from "@/hooks/useAIInsightMutations";
import { aiInsightsAPI } from "@/lib/api/ai-insights.api";
import { AIInsightInput } from "@/lib/validations/ai-insight.schemas";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function EditAIInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { updateInsight } = useAIInsightMutations();

  const { data: insight, isLoading } = useQuery({
    queryKey: ["ai-insight", resolvedParams.id],
    queryFn: () => aiInsightsAPI.getById(resolvedParams.id),
  });

  const handleSubmit = async (data: AIInsightInput) => {
    await updateInsight.mutateAsync({ id: resolvedParams.id, data });
    router.push("/admin/ai-insights");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12 flex items-center justify-center">
        <p className="text-slate-400">Insight no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/ai-insights">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>

          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Editar Insight
          </h1>
          <p className="text-slate-400">Actualiza la información del insight</p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
          <AIInsightForm
            initialData={insight}
            onSubmit={handleSubmit}
            isLoading={updateInsight.isPending}
          />
        </div>
      </div>
    </div>
  );
}
