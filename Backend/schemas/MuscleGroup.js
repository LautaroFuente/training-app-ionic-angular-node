import { z } from "zod";

export const MuscleGroupSchema = z.object({
  name: z.string()
    .min(1, "El nombre es obligatorio")          // Aseguramos que no esté vacío
    .max(100, "El nombre no puede exceder los 100 caracteres"),  // Aseguramos que no exceda los 100 caracteres
  description: z.string().optional()            // Descripción es opcional, pero si se proporciona, será una cadena válida
});

export const MuscleGroupNameSchema = MuscleGroupSchema.pick({
    name: true  // Solo validamos el campo 'name'
  });

export const MuscleGroupIdSchema = z.number()
  .int("El ID debe ser un número entero")   // El ID debe ser un entero
  .positive("El ID debe ser un número positivo")  // El ID debe ser mayor que cero
  .gt(0, "El ID debe ser mayor que cero");  // Aseguramos que el ID sea positivo y mayor que 0
