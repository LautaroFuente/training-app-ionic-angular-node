import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const weeklyCalendar = {

    addWeeklyCalendar: async (dataBody) => {

        try {
            return await prisma.weeklyCalendar.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un calendario semanal en el servicio", error);
            return null;
        }
    },

    getOneWeeklyCalendar: async (id) => {
            try { 
                return await prisma.weeklyCalendar.findUnique({
                    where:{
                        id:id
                    }
                });   
            } catch (error) {
                console.log("Error al buscar un calendario en el servicio", error);
                return null;
            }
        },

    deleteOneWeeklyCalendar: async (id) => {
        try {
            return await prisma.weeklyCalendar.delete({
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