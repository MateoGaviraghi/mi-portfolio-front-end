import { z } from "zod";

// Schema de validación para el formulario
export const aiInsightFormSchema = z.object({
  title: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres"),
  content: z.string().min(10, "Mínimo 10 caracteres"),
  category: z.string().min(2, "Categoría requerida"),
  tags: z.array(z.string()),
  relatedProjectId: z.string().optional(),
  isPublic: z.boolean(),
});

export type AIInsightInput = z.infer<typeof aiInsightFormSchema>;
