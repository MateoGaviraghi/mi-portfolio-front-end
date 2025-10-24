"use client";

import { useQuery } from "@tanstack/react-query";
import { skillsAPI } from "@/lib/api/skills.api";
import { useSkillMutations } from "@/hooks/useSkillMutations";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";

export default function AdminSkillsPage() {
  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => skillsAPI.getAll(),
  });

  const { deleteSkill } = useSkillMutations();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Eliminar la skill "${name}"?`)) {
      await deleteSkill.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
              Skills
            </h1>
            <p className="text-slate-400">
              Gestiona tus habilidades técnicas y profesionales
            </p>
          </div>
          <Link href="/admin/skills/new">
            <Button className="bg-linear-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Skill
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Skills</p>
                <p className="text-3xl font-bold text-white">
                  {skills?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Nivel Promedio</p>
                <p className="text-3xl font-bold text-white">
                  {skills && skills.length > 0
                    ? Math.round(
                        skills.reduce((acc, s) => acc + s.level, 0) /
                          skills.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Categorías</p>
                <p className="text-3xl font-bold text-white">
                  {skills ? new Set(skills.map((s) => s.category)).size : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : skills && skills.length > 0 ? (
          <div className="grid gap-4">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {skill.icon && (
                        <span className="text-2xl">{skill.icon}</span>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {skill.category}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-400">Nivel de dominio</span>
                        <span className="text-primary-400 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-primary-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>

                    {skill.description && (
                      <p className="text-slate-400 text-sm mt-3">
                        {skill.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    <Link href={`/admin/skills/${skill._id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 hover:border-slate-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-900/50 hover:border-red-800 text-red-400"
                      onClick={() => handleDelete(skill._id, skill.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-12 text-center">
            <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              No hay skills todavía
            </h3>
            <p className="text-slate-500 mb-6">
              Comienza agregando tus habilidades técnicas
            </p>
            <Link href="/admin/skills/new">
              <Button className="bg-linear-to-r from-primary-500 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Crear primera skill
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
