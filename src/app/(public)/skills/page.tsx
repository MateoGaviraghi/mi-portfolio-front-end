"use client";
import { useQuery } from "@tanstack/react-query";
import { skillsAPI } from "@/lib/api/skills.api";
import { SkillCard } from "@/components/skills/SkillCard";
import { Loader2, Zap } from "lucide-react";

export default function SkillsPage() {
  const {
    data: skills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsAPI.getAll,
  });

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    const category = skill.category || "Otros";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Skills & Tecnologías
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-1">
                Mi stack tecnológico y nivel de experiencia
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto" />
              <p className="text-slate-400">Cargando skills...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Error al cargar las skills. Intenta nuevamente.
            </p>
          </div>
        )}

        {/* Skills by Category */}
        {!isLoading && !error && groupedSkills && (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                  <h2 className="text-xl font-bold text-slate-300 uppercase tracking-wider">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill._id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!skills || skills.length === 0) && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">
              No hay skills disponibles aún.
            </p>
          </div>
        )}

        {/* Stats Summary */}
        {!isLoading && !error && skills && skills.length > 0 && (
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-primary-500/10 to-purple-600/10 border border-primary-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">
                {skills.length}
              </div>
              <div className="text-slate-400">Total Skills</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {skills.filter((s) => s.level >= 80).length}
              </div>
              <div className="text-slate-400">Nivel Avanzado</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {Object.keys(groupedSkills || {}).length}
              </div>
              <div className="text-slate-400">Categorías</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
