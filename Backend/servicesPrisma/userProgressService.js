import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userProgress = {
    getAllUserProgress: async () => {
        try {
            return prisma.userProgress.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los progresos de usuarios en el servicio", error);
            return null;
        }
    },

    addUserProgress: async (dataBody) => {

        try {
            return prisma.userProgress.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un progreso de usuario en el servicio", error);
            return null;
        }
    },

    getOneUserProgress: async (user_id) => {
        try { 
            return prisma.userProgress.findUnique({
                where:{
                    user_id:user_id
                }
            });   
        } catch (error) {
            console.log("Error al buscar un progreso de usuario en el servicio", error);
            return null;
        }
    },

    deleteOneUserProgress: async (id) => {
        try {
            return prisma.userProgress.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar un progreso de usuario en el servicio", error);
            return null;
        }
    },
}