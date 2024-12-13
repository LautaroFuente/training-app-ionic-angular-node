import { z } from "zod";

// Esquema para validar el formulario cuando el usuario ingresa los datos de una rutina
export const RoutineSchema = z.object({
    name: z.string()
      .min(1, { message: "El nombre es obligatorio" })   // Asegura que el nombre no esté vacío
      .max(100, { message: "El nombre no puede superar los 100 caracteres" }),  // Asegura que no exceda 100 caracteres
    description: z.string()
      .optional()  // Este campo es opcional
      .max(500, { message: "La descripción no puede superar los 500 caracteres" }),  // Limita la descripción a 500 caracteres
});

// Esquema para validar solo el campo `name` del formulario
export const RoutineNameSchema = RoutineSchema.pick({
    name: true,
});
  
// Esquema para validar que un id es un número entero positivo
export const RoutineIdSchema = z.number()
  .int({ message: "El ID debe ser un número entero" })
  .positive({ message: "El ID debe ser un número positivo" })
  .min(1, { message: "El ID debe ser mayor que 0" });  // Asegura que el ID sea mayor que 0
