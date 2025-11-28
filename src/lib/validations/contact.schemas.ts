import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  email: z
    .string()
    .email("Debe ser un email válido")
    .min(5, "El email es muy corto")
    .max(100, "El email no puede exceder 100 caracteres"),

  subject: z
    .string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(200, "El asunto no puede exceder 200 caracteres"),

  message: z
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
