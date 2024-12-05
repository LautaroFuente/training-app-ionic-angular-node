import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const exercise = {
    getAllExercises: async () => {
        try {
            return prisma.exercise.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los ejercicios en el servicio", err);
            throw new Error("Error al devolver todos los ejercicios en el servicio");
        }
    },
}