"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Loader2, Folder } from "lucide-react";

export default function ProjectsPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", category, search],
    queryFn: () => projectsAPI.getAll({ category, search }),
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12 space-y-4">
          <div className={mounted ? "animate-slide-in-left" : "opacity-0"}>
            <span className="text-secondary font-mono text-sm">03. </span>
            <h1 className="text-4xl md:text-5xl font-bold inline">Proyectos</h1>
            <div className="h-px bg-gradient-to-r from-secondary to-transparent mt-4 w-full max-w-md" />
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Explora mi trabajo y experiencia técnica en desarrollo web, móvil
              y backend.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div
          className={
            mounted ? "animate-slide-in-up animate-delay-100" : "opacity-0"
          }
        >
          <ProjectFilters
            category={category}
            setCategory={setCategory}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground">Cargando proyectos...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-6 text-center">
            <p className="text-destructive">
              Error al cargar los proyectos. Intenta nuevamente.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {data?.data?.map((project, index) => (
              <div
                key={project._id}
                className={
                  mounted
                    ? `animate-scale-in animate-delay-${
                        (index % 3) * 100 + 200
                      }`
                    : "opacity-0"
                }
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && data?.data?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Folder className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg">
              No se encontraron proyectos.
            </p>
            <p className="text-muted-foreground/80 text-sm mt-2">
              Intenta ajustar los filtros de búsqueda.
            </p>
          </div>
        )}

        {/* Results Counter */}
        {!isLoading && !error && data?.data && data.data.length > 0 && (
          <div className="mt-8 text-center text-muted-foreground text-sm">
            Mostrando {data.data.length} de {data.total} proyectos
          </div>
        )}
      </div>
    </div>
  );
}
