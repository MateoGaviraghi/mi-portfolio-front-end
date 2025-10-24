import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  position: z.string().min(2, "Posición requerida"),
  company: z.string().min(2, "Empresa requerida"),
  content: z.string().min(10, "Mínimo 10 caracteres"),
  rating: z.number().min(1).max(5),
  avatar: z.string().url().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
