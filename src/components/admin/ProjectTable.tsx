"use client";
import Link from "next/link";
import { Project } from "@/lib/api/projects.api";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Eye, Star } from "lucide-react";

interface Props {
  projects: Project[];
  onDelete: (id: string) => void;
}

export function ProjectTable({ projects, onDelete }: Props) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
        <p className="text-slate-400">
          No hay proyectos aún. Crea uno nuevo para empezar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/50">
              <th className="text-left p-4 text-sm font-semibold text-slate-300">
                Título
              </th>
              <th className="text-left p-4 text-sm font-semibold text-slate-300">
                Categoría
              </th>
              <th className="text-center p-4 text-sm font-semibold text-slate-300">
                Destacado
              </th>
              <th className="text-center p-4 text-sm font-semibold text-slate-300">
                <Eye className="w-4 h-4 inline" />
              </th>
              <th className="text-center p-4 text-sm font-semibold text-slate-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {project.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.images[0].url}
                        alt={project.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <p className="text-sm text-slate-400 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-md border border-primary-500/30">
                    {project.category}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {project.featured ? (
                    <Star className="w-5 h-5 text-yellow-500 inline fill-yellow-500" />
                  ) : (
                    <span className="text-slate-600">-</span>
                  )}
                </td>
                <td className="p-4 text-center text-slate-400">
                  {project.views || 0}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/projects/${project._id}/edit`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-400 hover:text-primary-300 hover:bg-primary-500/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm("¿Seguro que deseas eliminar este proyecto?")
                        ) {
                          onDelete(project._id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
