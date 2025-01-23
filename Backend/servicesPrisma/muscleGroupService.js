import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const muscleGroup = {
    getAllMuscleGroups: async () => {
        try {
            return await prisma.muscleGroup.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los grupos musculares en el servicio", error);
            return null;
        }
    },

    addMuscleGroup: async (dataBody) => {

        try {
            return await prisma.muscleGroup.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un grupo muscular en el servicio", error);
            return null;
        }
    },

    getOneMuscleGroup: async (name) => {
        try { 
            return await prisma.muscleGroup.findUnique({
                where:{
                    name:name
                }
            });   
        } catch (error) {
            console.log("Error al buscar un grupo muscular en el servicio", error);
            return null;
        }
    },

    deleteOneMuscleGroup: async (id) => {
        try {
            return await prisma.muscleGroup.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar un grupo muscular en el servicio", error);
            return null;
        }
    },
}