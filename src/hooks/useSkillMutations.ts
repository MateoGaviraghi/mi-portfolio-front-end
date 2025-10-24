import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSkillsAPI } from "@/lib/api/admin-skills.api";
import { SkillInput } from "@/lib/validations/skill.schemas";
import toast from "react-hot-toast";

export function useSkillMutations() {
  const queryClient = useQueryClient();

  const createSkill = useMutation({
    mutationFn: (data: SkillInput) => adminSkillsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill creada exitosamente");
    },
    onError: () => toast.error("Error al crear skill"),
  });

  const updateSkill = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SkillInput> }) =>
      adminSkillsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill actualizada exitosamente");
    },
    onError: () => toast.error("Error al actualizar skill"),
  });

  const deleteSkill = useMutation({
    mutationFn: (id: string) => adminSkillsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill eliminada exitosamente");
    },
    onError: () => toast.error("Error al eliminar skill"),
  });

  return { createSkill, updateSkill, deleteSkill };
}
