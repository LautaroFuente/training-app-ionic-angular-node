import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const routineExercise = {
    getAllRoutineExercises: async () => {
        try {
            return await prisma.routineExercise.findMany();    
        } catch (error) {
            console.log("Error al devolver todas las relaciones rutina/ejercicio en el servicio");
            return null;
        }
    },        

    addRoutineExercise: async (dataBody) => {

        try {
            return await prisma.routineExercise.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar una relacion rutina/ejercicio en el servicio", error);
            return null;
        }
    },

    getOneRoutineExercise: async (name) => {
        try { 
            return await prisma.routineExercise.findUnique({
                where:{
                    name:name
                }
            });   
        } catch (error) {
            console.log("Error al buscar una relacion rutina/ejercicio en el servicio", error);
            return null;
        }
    },

    deleteOneRoutineExercise: async (id) => {
        try {
            return await prisma.routineExercise.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar la relacion rutina/ejercicio en el servicio", error);
            return null;
        }
    },
}