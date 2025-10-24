"use client";

import { useRouter } from "next/navigation";
import { SkillForm } from "@/components/admin/SkillForm";
import { useSkillMutations } from "@/hooks/useSkillMutations";
import { SkillInput } from "@/lib/validations/skill.schemas";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NewSkillPage() {
  const router = useRouter();
  const { createSkill } = useSkillMutations();

  const handleSubmit = async (data: SkillInput) => {
    await createSkill.mutateAsync(data);
    router.push("/admin/skills");
  };

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
            Nueva Skill
          </h1>
          <p className="text-slate-400">
            Agrega una nueva habilidad técnica a tu portfolio
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8">
          <SkillForm
            onSubmit={handleSubmit}
            isLoading={createSkill.isPending}
          />
        </div>
      </div>
    </div>
  );
}
