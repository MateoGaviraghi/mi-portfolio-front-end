"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Loader2, Folder } from "lucide-react";

export default function ProjectsPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", category, search],
    queryFn: () => projectsAPI.getAll({ category, search }),
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Proyectos
              </h1>
              <p className="text-slate-400 mt-1">
                Explora mi trabajo y experiencia técnica
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilters
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto" />
              <p className="text-slate-400">Cargando proyectos...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Error al cargar los proyectos. Intenta nuevamente.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && data?.data?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4">
              <Folder className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">
              No se encontraron proyectos.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Intenta ajustar los filtros de búsqueda.
            </p>
          </div>
        )}

        {/* Results Counter */}
        {!isLoading && !error && data?.data && data.data.length > 0 && (
          <div className="mt-8 text-center text-slate-500 text-sm">
            Mostrando {data.data.length} de {data.total} proyectos
          </div>
        )}
      </div>
    </div>
  );
}
