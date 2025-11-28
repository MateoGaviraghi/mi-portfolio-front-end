"use client";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Heart,
  Eye,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => projectsAPI.getById(params.id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto" />
          <p className="text-slate-400">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mx-auto">
            <ExternalLink className="w-10 h-10 text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Proyecto no encontrado
          </h2>
          <p className="text-slate-400">
            El proyecto que buscas no existe o fue eliminado.
          </p>
          <Link href="/projects">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a proyectos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a proyectos
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
                {project.title}
              </h1>
              {project.featured && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500 to-purple-600 text-white text-sm rounded-full font-semibold">
                  ⭐ Proyecto Destacado
                </span>
              )}
            </div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Tecnologías utilizadas
          </h3>
          <div className="flex gap-2 flex-wrap">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-900/80 border border-slate-800 text-primary-400 rounded-lg font-medium hover:border-primary-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-slate-700 hover:border-slate-600"
              >
                <Github className="w-4 h-4 mr-2" />
                Ver código
              </Button>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Demo en vivo
              </Button>
            </a>
          )}
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Galería
            </h3>
            <ProjectGallery images={project.images} videos={project.videos} />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-lg p-4 text-center">
            <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {project.likes || 0}
            </div>
            <div className="text-xs text-slate-500">Me gusta</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-lg p-4 text-center">
            <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {project.views || 0}
            </div>
            <div className="text-xs text-slate-500">Vistas</div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-lg p-4 text-center">
            <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">
              {new Date(project.createdAt).toLocaleDateString("es-ES", {
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-xs text-slate-500">Publicado</div>
          </div>
        </div>
      </div>
    </div>
  );
}
