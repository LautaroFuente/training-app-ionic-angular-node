import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const routine = {
    getAllRoutines: async () => {
        try {
            return prisma.routine.findMany();    
        } catch (error) {
            console.log("Error al devolver todas las rutinas en el servicio", error);
            return null;
        }
    },

    addRoutine: async (dataBody) => {

        try {
            return prisma.routine.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar una rutina en el servicio", error);
            return null;
        }
    },

    getOneRoutine: async (name) => {
        try { 
            return prisma.routine.findUnique({
                where:{
                    name:name
                }
            });   
        } catch (error) {
            console.log("Error al buscar una rutina en el servicio", error);
            return null;
        }
    },

    deleteOneRoutine: async (id) => {
        try {
            return prisma.routine.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar una rutina en el servicio", error);
            return null;
        }
    },
}