"use client";

import { AIInsightForm } from "@/components/admin/AIInsightForm";
import { useAIInsightMutations } from "@/hooks/useAIInsightMutations";
import { AIInsightInput } from "@/lib/validations/ai-insight.schemas";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewAIInsightPage() {
  const router = useRouter();
  const { createInsight } = useAIInsightMutations();

  const handleSubmit = async (data: AIInsightInput) => {
    await createInsight.mutateAsync(data);
    router.push("/admin/ai-insights");
  };

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

          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Crear Nuevo Insight
          </h1>
          <p className="text-slate-400">
            Comparte tus conocimientos técnicos y aprendizajes
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
          <AIInsightForm
            onSubmit={handleSubmit}
            isLoading={createInsight.isPending}
          />
        </div>
      </div>
    </div>
  );
}
