"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { skillsAPI } from "@/lib/api/skills.api";
import { SkillForm } from "@/components/admin/SkillForm";
import { useSkillMutations } from "@/hooks/useSkillMutations";
import { SkillInput } from "@/lib/validations/skill.schemas";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function EditSkillPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { updateSkill } = useSkillMutations();

  const { data: skill, isLoading } = useQuery({
    queryKey: ["skill", params.id],
    queryFn: () => skillsAPI.getById(params.id),
  });

  const handleSubmit = async (data: SkillInput) => {
    await updateSkill.mutateAsync({ id: params.id, data });
    router.push("/admin/skills");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-950 pt-24 pb-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-red-400">Skill no encontrada</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/admin/skills">
          <Button
            variant="ghost"
            className="mb-6 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Skills
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Editar Skill
          </h1>
          <p className="text-slate-400">
            Modifica los detalles de la habilidad &quot;{skill.name}&quot;
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
          <SkillForm
            initialData={skill}
            onSubmit={handleSubmit}
            isLoading={updateSkill.isPending}
          />
        </div>
      </div>
    </div>
  );
}
