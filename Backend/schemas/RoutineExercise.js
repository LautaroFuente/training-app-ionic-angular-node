import { z } from "zod";

export const RoutineExerciseSchema = z.object({
  repetitions: z
    .number()
    .min(1, { message: "Las repeticiones deben ser al menos 1." })
    .max(1000, { message: "Las repeticiones no pueden ser mayores a 1000." }),
  sets: z
    .number()
    .min(1, { message: "Las series deben ser al menos 1." })
    .max(1000, { message: "Las series no pueden ser mayores a 1000." }),
  weight: z
    .number()
    .optional()  // El peso es opcional
    .min(0, { message: "El peso no puede ser negativo." })
    .max(1000, { message: "El peso no puede ser mayor a 1000 kg." }),
});

export const RoutineExerciseIdSchema = z.number().int().positive({ message: "El ID debe ser un número entero positivo." });
