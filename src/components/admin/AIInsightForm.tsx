"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  aiInsightSchema,
  AIInsightInput,
} from "@/lib/validations/ai-insight.schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Sparkles, Tag, FolderOpen } from "lucide-react";
import { useState } from "react";

interface AIInsightFormProps {
  initialData?: Partial<AIInsightInput>;
  onSubmit: (data: AIInsightInput) => Promise<void>;
  isLoading?: boolean;
}

export function AIInsightForm({
  initialData,
  onSubmit,
  isLoading,
}: AIInsightFormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AIInsightInput>({
    resolver: zodResolver(aiInsightSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      relatedProjectId: initialData?.relatedProjectId || "",
      isPublic: initialData?.isPublic || false,
    },
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Título del Insight
        </label>
        <Input
          {...register("title")}
          placeholder="ej: Mejores prácticas de React Server Components"
          error={errors.title?.message}
          className="bg-slate-900/50 border-slate-700"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Categoría
        </label>
        <div className="relative">
          <FolderOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <select
            {...register("category")}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-10 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Architecture">Architecture</option>
            <option value="Performance">Performance</option>
            <option value="Security">Security</option>
            <option value="Best Practices">Best Practices</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Contenido
        </label>
        <textarea
          {...register("content")}
          rows={8}
          placeholder="Escribe el contenido del insight aquí..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags (opcional)
        </label>
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Agregar tag y presiona Enter"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-10 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button type="button" onClick={addTag} variant="outline">
            Agregar
          </Button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-primary-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Project ID (optional) */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          ID del Proyecto Relacionado (opcional)
        </label>
        <Input
          {...register("relatedProjectId")}
          placeholder="ej: 507f1f77bcf86cd799439011"
          error={errors.relatedProjectId?.message}
          className="bg-slate-900/50 border-slate-700"
        />
        <p className="text-xs text-slate-500 mt-1">
          Asocia este insight con un proyecto específico
        </p>
      </div>

      {/* Public Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...register("isPublic")}
          id="isPublic"
          className="w-5 h-5 rounded border-slate-700 text-primary-500 focus:ring-2 focus:ring-primary-500"
        />
        <label
          htmlFor="isPublic"
          className="text-sm text-slate-300 cursor-pointer"
        >
          Publicar inmediatamente
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          className="bg-linear-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {initialData ? "Actualizar Insight" : "Crear Insight"}
        </Button>
      </div>
    </form>
  );
}
