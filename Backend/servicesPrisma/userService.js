import { PrismaClient } from '@prisma/client'
import { weeklyCalendar } from './weeklyCalendarService';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function hashPassword(password) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

export const user = {
    getAllUsers: async () => {
        try {
            return await prisma.user.findMany();    
        } catch (error) {
            console.log("Error al devolver todos los usuarios en el servicio", error);
            return null;
        }
    },

    addUser: async (dataBody) => {

        try {
            const hashedPassword = await hashPassword(dataBody.password);

            const user = await prisma.user.create({
                data: {
                    ...dataBody,
                    password: hashedPassword, 
                },
            });

            const weeklyCalendarForUser = await weeklyCalendar.addWeeklyCalendar(user.id);

            return user;   
        } catch (error) {
            console.log("Error al agregar un usuario en el servicio", error);
            return null;
        }
    },

    getOneUser: async (email) => {
        try { 
            return await prisma.user.findUnique({
                where:{
                    email:email
                }
            });   
        } catch (error) {
            console.log("Error al buscar un usuario en el servicio", error);
            return null;
        }
    },

    deleteOneUser: async (id) => {
        try {
            return await prisma.user.delete({
                where:{
                    id:id
                }
            });   
        } catch (error) {
            console.log("Error al eliminar un usuario en el servicio", error);
            return null;
        }
    },
}