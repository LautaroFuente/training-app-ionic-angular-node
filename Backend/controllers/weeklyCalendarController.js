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