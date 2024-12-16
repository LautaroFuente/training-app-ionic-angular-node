import { z } from "zod";

// Esquema para el User completo
export const userSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("El correo debe ser válido").min(1, "El correo es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  gender: z.enum(["H", "M", "O"], "El género debe ser H (Hombre), M (Mujer) o O (Otro)").optional(),
});

// Esquema para validar solo el correo electrónico
export const userEmailSchema = userSchema.pick({ email: true });

// Esquema para validar el ID como un número entero positivo
export const userIdSchema = z.number().int().positive("El ID debe ser un número entero positivo");
