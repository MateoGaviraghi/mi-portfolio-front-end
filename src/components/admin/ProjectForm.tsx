"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectInput } from "@/lib/validations/project.schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface Props {
  initialData?: Partial<ProjectInput>;
  onSubmit: (data: ProjectInput) => void;
  isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading }: Props) {
  const [techInput, setTechInput] = useState(
    initialData?.technologies?.join(", ") || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      ...initialData,
      category: initialData?.category || "web",
      featured: initialData?.featured || false,
    },
  });

  const handleTechChange = (value: string) => {
    setTechInput(value);
    const techs = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setValue("technologies", techs);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6"
    >
      <div>
        <Input
          label="Título"
          placeholder="Mi Proyecto Increíble"
          className="bg-slate-800/50 border-slate-700 text-white"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Descripción
        </label>
        <textarea
          {...register("description")}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          rows={4}
          placeholder="Describe tu proyecto en detalle..."
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Categoría
        </label>
        <select
          {...register("category")}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
          <option value="ia">IA</option>
          <option value="other">Otro</option>
        </select>
        {errors.category && (
          <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-300">
          Tecnologías (separadas por coma)
        </label>
        <input
          type="text"
          value={techInput}
          onChange={(e) => handleTechChange(e.target.value)}
          placeholder="React, TypeScript, Node.js, MongoDB"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        />
        {errors.technologies && (
          <p className="text-red-400 text-sm mt-1">
            {errors.technologies.message}
          </p>
        )}
        <div className="flex gap-2 flex-wrap mt-2">
          {techInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-md border border-primary-500/30"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>

      <div>
        <Input
          label="GitHub URL (opcional)"
          placeholder="https://github.com/usuario/repo"
          className="bg-slate-800/50 border-slate-700 text-white"
          {...register("githubUrl")}
        />
        {errors.githubUrl && (
          <p className="text-red-400 text-sm mt-1">
            {errors.githubUrl.message}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Live URL (opcional)"
          placeholder="https://mi-proyecto.com"
          className="bg-slate-800/50 border-slate-700 text-white"
          {...register("liveUrl")}
        />
        {errors.liveUrl && (
          <p className="text-red-400 text-sm mt-1">{errors.liveUrl.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <input
          type="checkbox"
          {...register("featured")}
          id="featured"
          className="w-4 h-4 rounded border-slate-600 text-primary-500 focus:ring-primary-500"
        />
        <label htmlFor="featured" className="text-slate-300 cursor-pointer">
          ⭐ Marcar como proyecto destacado
        </label>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
      >
        {initialData ? "Actualizar" : "Crear"} Proyecto
      </Button>
    </form>
  );
}
