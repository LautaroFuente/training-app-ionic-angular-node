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

    getDayProgressOfUser: async (userId, dayName) => {
        try {
            // Obtener la información de las rutinas, ejercicios y progreso del usuario
            const routinesProgress = await prisma.day.findMany({
                where: {
                    weeklyCalendar: {
                    userId: userId, // Filtrar por el usuario
                    },
                    name: dayName, // Filtrar por el nombre del día
                    status: 'assigned', // Solo los días que tienen una rutina asignada
                },
                select: {
                    id: true, // ID del día
                    routineId: true, // ID de la rutina asignada
                    routine: {
                        select: {
                            id: true, // ID de la rutina
                            name: true, // Nombre de la rutina
                            routineExercise: {
                                select: {
                                    exerciseId: true, // ID del ejercicio asignado
                                },
                            },
                        },
                    },
                    userProgress: {
                        where: {
                            userId: userId, // Solo el progreso de este usuario
                        },
                        select: {
                            exerciseId: true, // ID del ejercicio completado
                            completed: true, // Estado de si el ejercicio fue completado
                        },
                    },
                },
            });

            const results = routinesProgress.map((day) => {
            const totalExercises = day.routine.routineExercise.length;
            const completedExercises = day.userProgress.filter((progress) => progress.completed).length;
            const completionPercentage = totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;

            return {
                dayId: day.id,
                routineId: day.routine.id,
                routineName: day.routine.name,
                totalExercises,
                completedExercises,
                completionPercentage,
            };
            });
        } catch (error) {
            console.log("Error al obtener un progreso de usuario en el dia actual en el servicio", error);
            return null;
        }
    },
}