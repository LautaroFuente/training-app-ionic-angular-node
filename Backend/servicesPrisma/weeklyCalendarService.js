import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const weeklyCalendar = {

    addWeeklyCalendar: async (userId) => {

        try {
            return await prisma.weeklyCalendar.create({
                data: {
                    userId: userId, // Relacionamos el calendario con el usuario
                    days: {
                        create: [
                            { name: 'Lunes', status: 'empty', completed: false },
                            { name: 'Martes', status: 'empty', completed: false },
                            { name: 'Miércoles', status: 'empty', completed: false },
                            { name: 'Jueves', status: 'empty', completed: false },
                            { name: 'Viernes', status: 'empty', completed: false },
                            { name: 'Sábado', status: 'empty', completed: false },
                            { name: 'Domingo', status: 'empty', completed: false }
                        ]
                    }
                }
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

        getOneWeeklyCalendarFromOneUser: async (id) => {
        try { 
            // Obtener el calendario semanal y los días asociados
            const weeklyCalendar = await prisma.weeklyCalendar.findUnique({
                where: { userId: userId },
                include: {
                    days: true,  // Incluir todos los días relacionados
                },
            });
  
            if (!weeklyCalendar) {
                throw new Error('Calendario semanal no encontrado para el usuario');
            }
  
            // Obtener las rutinas asignadas a cada día
            const daysWithRoutines = await Promise.all(weeklyCalendar.days.map(async (day) => {
                if (day.routineId) {
                // Si el día tiene una rutina asignada, obtén los detalles de la rutina
                    const routine = await prisma.routine.findUnique({
                        where: { id: day.routineId }
                    });
                    // Retorna el día con la rutina asociada
                    return { ...day, routine };
                } else {
                // Si no tiene rutina asignada, simplemente devuelve el día sin la rutina
                    return day;
                }
            }));
  
            // Retorna los días con las rutinas asignadas
            return daysWithRoutines;  
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