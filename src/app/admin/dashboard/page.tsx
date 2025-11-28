"use client";
import { useQuery } from "@tanstack/react-query";
import { projectsAPI } from "@/lib/api/projects.api";
import { skillsAPI } from "@/lib/api/skills.api";
import { BarChart3, Folder, Zap, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsAPI.getAll(),
  });

  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsAPI.getAll,
  });

  const stats = [
    {
      title: "Total Proyectos",
      value: projects?.total || 0,
      icon: Folder,
      color: "from-primary-500 to-purple-600",
      bgColor: "from-primary-500/10 to-purple-600/10",
      borderColor: "border-primary-500/30",
    },
    {
      title: "Skills",
      value: skills?.length || 0,
      icon: Zap,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-500/10 to-emerald-600/10",
      borderColor: "border-green-500/30",
    },
    {
      title: "Vistas Totales",
      value: projects?.data?.reduce((acc, p) => acc + (p.views || 0), 0) || 0,
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-500/10 to-red-600/10",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Dashboard Admin
            </h1>
            <p className="text-slate-400 mt-1">
              Panel de control y estadísticas del portfolio
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-xl p-6 hover:scale-105 transition-transform`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Projects */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Proyectos Recientes
          </h2>
          <div className="space-y-3">
            {projects?.data?.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              >
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
                    <p className="text-sm text-slate-400">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>👁️ {project.views || 0}</span>
                  <span>❤️ {project.likes || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
