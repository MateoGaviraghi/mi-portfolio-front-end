"use client";
import { useRouter } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { useProjectMutations } from "@/hooks/useProjectMutations";
import { ProjectInput } from "@/lib/validations/project.schemas";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NewProjectPage() {
  const router = useRouter();
  const { createProject } = useProjectMutations();

  const handleSubmit = async (data: ProjectInput) => {
    await createProject.mutateAsync(data);
    router.push("/admin/projects");
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Crear Nuevo Proyecto
            </h1>
            <p className="text-slate-400 mt-1">
              Completa los detalles del proyecto
            </p>
          </div>
        </div>

        {/* Form */}
        <ProjectForm
          onSubmit={handleSubmit}
          isLoading={createProject.isPending}
        />
      </div>
    </div>
  );
}
