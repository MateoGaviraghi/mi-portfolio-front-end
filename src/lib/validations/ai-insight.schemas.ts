import { z } from "zod";

export const aiInsightSchema = z.object({
  title: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres"),
  content: z.string().min(10, "Mínimo 10 caracteres"),
  category: z.string().min(2, "Categoría requerida"),
  tags: z.array(z.string()).optional().default([]),
  relatedProjectId: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export type AIInsightInput = z.infer<typeof aiInsightSchema>;
