import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const exercise = {
    getAllExercises: async () => {
        try {
            return prisma.exercise.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los ejercicios en el servicio", err);
            return null;
        }
    },

    addExercise: async (dataBody) => {

        try {
            return prisma.exercise.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un ejercicio en el servicio", err);
            return null;
        }
    },

    getOneExercise: async (name) => {
        try { 
            return prisma.exercise.findUnique({
                where:{
                    name:name
                }
            });   
        } catch (error) {
            console.log("Error al buscar un ejercicio en el servicio", err);
            return null;
        }
    },

    deleteOneExercise: async (id) => {
        try {
            return prisma.exercise.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar un ejercicio en el servicio", err);
            return null;
        }
    },
}