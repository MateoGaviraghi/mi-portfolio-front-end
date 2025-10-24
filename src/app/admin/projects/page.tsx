"use client";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { useProjectMutations } from "@/hooks/useProjectMutations";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus, Folder } from "lucide-react";

export default function AdminProjectsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsAPI.getAll(),
  });

  const { deleteProject } = useProjectMutations();

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Gestión de Proyectos
              </h1>
              <p className="text-slate-400 mt-1">
                {data?.total || 0} proyectos en total
              </p>
            </div>
          </div>

          <Link href="/admin/projects/new">
            <Button className="bg-linear-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700">
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Proyecto
            </Button>
          </Link>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
            <p className="text-slate-400">Cargando proyectos...</p>
          </div>
        ) : data?.data ? (
          <ProjectTable
            projects={data.data}
            onDelete={(id) => deleteProject.mutate(id)}
          />
        ) : (
          <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
            <p className="text-slate-400">No hay proyectos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
