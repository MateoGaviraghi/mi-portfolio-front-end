"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, SkillInput } from "@/lib/validations/skill.schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Props {
  initialData?: Partial<SkillInput>;
  onSubmit: (data: SkillInput) => void;
  isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || { level: 50 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Nombre de la Skill
        </label>
        <Input
          {...register("name")}
          placeholder="React, TypeScript, Node.js..."
          className="bg-slate-900/50 border-slate-800"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Categoría
        </label>
        <Input
          {...register("category")}
          placeholder="Frontend, Backend, DevOps..."
          className="bg-slate-900/50 border-slate-800"
        />
        {errors.category && (
          <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Nivel */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Nivel de Dominio (0-100)
        </label>
        <input
          type="number"
          {...register("level", { valueAsNumber: true })}
          min="0"
          max="100"
          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.level && (
          <p className="text-red-400 text-sm mt-1">{errors.level.message}</p>
        )}
      </div>

      {/* Icono */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Icono (emoji o clase CSS)
        </label>
        <Input
          {...register("icon")}
          placeholder="⚛️ o devicon-react-plain..."
          className="bg-slate-900/50 border-slate-800"
        />
        {errors.icon && (
          <p className="text-red-400 text-sm mt-1">{errors.icon.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Descripción (opcional)
        </label>
        <textarea
          {...register("description")}
          placeholder="Detalles adicionales sobre tu experiencia con esta tecnología..."
          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-linear-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
      >
        {initialData ? "Actualizar" : "Crear"} Skill
      </Button>
    </form>
  );
}
