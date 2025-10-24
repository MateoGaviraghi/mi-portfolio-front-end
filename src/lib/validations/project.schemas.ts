import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  category: z.enum(["web", "mobile", "backend", "fullstack", "ia", "other"]),
  technologies: z.array(z.string()).min(1, "Agrega al menos una tecnología"),
  githubUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  liveUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  featured: z.boolean().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
