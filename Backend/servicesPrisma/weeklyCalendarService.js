import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const weeklyCalendar = {

    addExercise: async (dataBody) => {

        try {
            return prisma.exercise.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un calendario semanal en el servicio", error);
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
            console.log("Error al eliminar calendario semanal en el servicio", error);
            return null;
        }
    },
}