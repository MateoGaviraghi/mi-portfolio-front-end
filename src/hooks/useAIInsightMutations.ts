import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiInsightsAPI } from "@/lib/api/ai-insights.api";
import { AIInsightInput } from "@/lib/validations/ai-insight.schemas";
import toast from "react-hot-toast";

export function useAIInsightMutations() {
  const queryClient = useQueryClient();

  const createInsight = useMutation({
    mutationFn: (data: AIInsightInput) => aiInsightsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-insights"] });
      queryClient.invalidateQueries({ queryKey: ["ai-insights-all"] });
      toast.success("✅ Insight creado exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al crear insight");
    },
  });

  const updateInsight = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AIInsightInput> }) =>
      aiInsightsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-insights"] });
      queryClient.invalidateQueries({ queryKey: ["ai-insights-all"] });
      toast.success("✅ Insight actualizado");
    },
    onError: () => {
      toast.error("❌ Error al actualizar insight");
    },
  });

  const deleteInsight = useMutation({
    mutationFn: (id: string) => aiInsightsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-insights"] });
      queryClient.invalidateQueries({ queryKey: ["ai-insights-all"] });
      toast.success("🗑️ Insight eliminado");
    },
    onError: () => {
      toast.error("❌ Error al eliminar insight");
    },
  });

  const publishInsight = useMutation({
    mutationFn: (id: string) => aiInsightsAPI.publish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-insights"] });
      queryClient.invalidateQueries({ queryKey: ["ai-insights-all"] });
      toast.success("🌍 Insight publicado");
    },
    onError: () => {
      toast.error("❌ Error al publicar insight");
    },
  });

  const unpublishInsight = useMutation({
    mutationFn: (id: string) => aiInsightsAPI.unpublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-insights"] });
      queryClient.invalidateQueries({ queryKey: ["ai-insights-all"] });
      toast.success("🔒 Insight despublicado");
    },
    onError: () => {
      toast.error("❌ Error al despublicar insight");
    },
  });

  return {
    createInsight,
    updateInsight,
    deleteInsight,
    publishInsight,
    unpublishInsight,
  };
}
