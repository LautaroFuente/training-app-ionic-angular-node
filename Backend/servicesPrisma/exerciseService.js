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

    addExercise: async () => {
        try {
            return prisma.exercise.create({
                data:{
                    name,
                    description,
                    muscle_group_id,
                    video_url,
                    image_url
                }
            });    
        } catch (error) {
            console.log("Error al agregar un ejercicio en el servicio", err);
            throw new Error("Error al agregar un ejercicio en el servicio");
        }
    },

    getOneExercise: async () => {
        try {
            return prisma.exercise.findMany();    
        } catch (error) {
            console.log("Error al buscar un ejercicio en el servicio", err);
            throw new Error("Error al buscar un ejercicio en el servicio");
        }
    },

    deleteOneExercise: async () => {
        try {
            return prisma.exercise.findMany();    
        } catch (error) {
            console.log("Error al eliminar un ejercicio en el servicio", err);
            throw new Error("Error al eliminar un ejercicio en el servicio");
        }
    },
}