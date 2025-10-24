import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  category: z.string().min(2, "Categoría requerida"),
  level: z.number().min(0).max(100, "Nivel entre 0-100"),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export type SkillInput = z.infer<typeof skillSchema>;
