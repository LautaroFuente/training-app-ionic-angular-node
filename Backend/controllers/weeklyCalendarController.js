import { weeklyCalendar } from "../servicesPrisma/weeklyCalendarService.js"



export const addWeeklyCalendar = async (req, res) =>{
    try {

        let data = await weeklyCalendar.addWeeklyCalendar(req.body);

        if(data != null){
            return res.status(201).json(data);
        }else{
            return res.status(500).json({Error:"Error al crear el recurso en la base de datos"});
        }

    } catch (error) {
        console.log("Error al agregar calendario semanal en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneWeeklyCalendar = async (req, res) =>{
    try {
        const { id } = req.params;

        let data = await weeklyCalendar.deleteOneWeeklyCalendar(id);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al eliminar el recurso en la base de datos"});
        }

    } catch (error) {
        console.log("Error al eliminar calendario semanal en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneWeeklyCalendar = async (req, res) =>{
    try {
        const { id } = req.params;

        let data = await weeklyCalendar.getOneWeeklyCalendar(id);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir un calendario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneWeeklyCalendarFromOneUser = async (req, res) =>{
    try {
        const { userId } = req.params;

        let data = await weeklyCalendar.getOneWeeklyCalendarFromOneUser(userId);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir un calendario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const addRoutineToOneDay = async (req, res) =>{
    try {
        const { dayid, routineid } = req.params;

        const dayId = parseInt(dayid);
        const routineId = parseInt(routineid);

        let data = await weeklyCalendar.addRoutineToOneDay(dayId, routineId);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al asignar una rutina a un dia del calendario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const removeRoutineFromOneDay = async (req, res) =>{
    try {
        const { dayid } = req.params;

        const dayId = parseInt(dayid);

        let data = await weeklyCalendar.removeRoutineFromOneDay(dayId);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al eliminar las rutinas de un dia del calendario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}