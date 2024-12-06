export const ExerciseSchema = z.object({
    name: z.string().min(1, 'El nombre del ejercicio es obligatorio'),  // El nombre debe ser una cadena no vacía
    description: z.string().optional(),  // La descripción es opcional
    muscle_group: z.string().min(1, 'El grupo muscular es obligatorio'),  // El grupo muscular no puede estar vacío
    video_url: z.string().url().optional(),  // URL válida para el video (opcional)
    image_url: z.string().url().optional(),  // URL válida para la imagen (opcional)
  });