import { Skill } from "@/lib/api/skills.api";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 space-y-4 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5">
      <div className="flex items-center gap-3">
        {skill.icon && (
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary-500/20 to-purple-600/20 flex items-center justify-center text-2xl border border-primary-500/30">
            {skill.icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-white">{skill.name}</h3>
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            {skill.category}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-400">
            {skill.level}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-linear-to-r from-primary-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${skill.level}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {skill.description && (
        <p className="text-sm text-slate-400 leading-relaxed">
          {skill.description}
        </p>
      )}
    </div>
  );
}
