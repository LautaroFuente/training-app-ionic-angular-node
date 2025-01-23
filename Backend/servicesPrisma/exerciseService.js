import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const exercise = {
    getAllExercises: async () => {
        try {
            return await prisma.exercise.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los ejercicios en el servicio", error);
            return null;
        }
    },

    addExercise: async (dataBody) => {

        try {
            return await prisma.exercise.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un ejercicio en el servicio", error);
            return null;
        }
    },

    getOneExercise: async (name) => {
        try { 
            return await prisma.exercise.findUnique({
                where:{
                    name:name
                }
            });   
        } catch (error) {
            console.log("Error al buscar un ejercicio en el servicio", error);
            return null;
        }
    },

    deleteOneExercise: async (id) => {
        try {
            return await prisma.exercise.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar un ejercicio en el servicio", error);
            return null;
        }
    },
}