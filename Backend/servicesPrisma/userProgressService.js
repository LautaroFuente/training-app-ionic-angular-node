import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const userProgress = {
    getAllUserProgress: async () => {
        try {
            return await prisma.userProgress.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los progresos de usuarios en el servicio", error);
            return null;
        }
    },

    addUserProgress: async (dataBody) => {

        try {
            return await prisma.userProgress.create({
                data: dataBody
            });    
        } catch (error) {
            console.log("Error al agregar un progreso de usuario en el servicio", error);
            return null;
        }
    },

    getOneUserProgress: async (user_id) => {
        try { 
            return await prisma.userProgress.findUnique({
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
            return await prisma.userProgress.delete({
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
                // Si 'day.routine' no existe, no hay rutina asignada, así que no intentamos acceder a sus propiedades
                const totalExercises = day.routine ? day.routine.routineExercise.length : 0; 
                const completedExercises = day.userProgress.filter((progress) => progress.completed).length;
                const completionPercentage = totalExercises === 0 ? 0 : (completedExercises / totalExercises) * 100;
            
                return {
                    dayId: day.id,
                    routineId: day.routine ? day.routine.id : null, // Si no hay rutina, asignamos null
                    routineName: day.routine ? day.routine.name : null, // Si no hay rutina, asignamos null
                    totalExercises,
                    completedExercises,
                    completionPercentage,
                };
            })    

            return results;
        } catch (error) {
            console.log("Error al obtener un progreso de usuario en el dia actual en el servicio", error);
            return null;
        }
    },

    getRoutineCompletionForUser: async (userId, dayId) => {
        // Obtenemos el calendario semanal para el usuario
        const weeklyCalendar = await prisma.weeklyCalendar.findFirst({
          where: {
            userId: userId,
            days: {
              some: {
                id: dayId,  // Filtramos por el día especificado
              },
            },
          },
          include: {
            days: {
              where: {
                id: dayId,  // Solo el día específico
              },
              include: {
                routines: {
                  include: {
                    routineExercise: {
                      include: {
                        exercise: true, // Incluir detalles de los ejercicios
                      },
                    },
                  },
                },
              },
            },
          },
        });
      
        if (!weeklyCalendar) {
          return []; // Si no se encuentra el calendario, retornamos un array vacío
        }
      
        // Iteramos sobre las rutinas asignadas al día
        const routineCompletions = await Promise.all(weeklyCalendar.days[0].routines.map(async (routine) => {
          // Obtenemos todos los ejercicios asignados a la rutina
          const exercises = routine.routineExercise;
      
          // Calculamos cuántos ejercicios se han completado
          const completedExercises = await Promise.all(exercises.map(async (routineEx) => {
            const progress = await prisma.userProgress.findFirst({
              where: {
                userId: userId,
                dayId: dayId,
                exerciseId: routineEx.exerciseId,
                routineId: routine.id,
              },
            });
      
            return progress?.completed ? 1 : 0;  // Devuelve 1 si completado, 0 si no
          }));
      
          const completedCount = completedExercises.reduce((acc, completed) => acc + completed, 0);
          const totalExercises = exercises.length;
          const completionPercentage = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
      
          return {
            routineName: routine.name,
            completionPercentage: completionPercentage,
          };
        }));
      
        return routineCompletions;
      },
}