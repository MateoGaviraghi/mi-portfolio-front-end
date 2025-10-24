"use client";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/api/projects.api";
import { Button } from "@/components/ui/Button";
import { Eye, Heart, ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const mainImage = project.images?.[0]?.url || "/placeholder.jpg";

  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={mainImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60" />

        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-linear-to-r from-primary-500 to-purple-600 rounded-full text-xs font-semibold">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-white group-hover:text-primary-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex gap-2 flex-wrap">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-800/80 text-primary-400 text-xs rounded-md border border-slate-700"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-2 py-1 bg-slate-800/80 text-slate-400 text-xs rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {project.likes || 0}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {project.views || 0}
            </span>
          </div>

          <Link href={`/projects/${project._id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-400 hover:text-primary-300 hover:bg-primary-500/10"
            >
              Ver más
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
