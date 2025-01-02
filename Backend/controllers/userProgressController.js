import { userProgress } from "../servicesPrisma/userProgressService.js";

export const getAllUserProgress = async (req, res) =>{
    try {
        let data = await userProgress.getAllUserProgress();

        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todos los progresos de los usuarios en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addUserProgress = async (req, res) =>{
    try {

        let { user_id } = req.body;
        let existingUserProgress = await user.getOneUserProgress(user_id);

        if(existingUserProgress != null){
            return res.status(409).json({Message:"El progreso de usuario a crear ya existe"});
        }

        let data = await user.addUserProgress(req.body);

        if(data != null){
            return res.status(201).json(data);
        }else{
            return res.status(500).json({Error:"Error al crear el recurso en la base de datos"});
        }

    } catch (error) {
        console.log("Error al agregar un progreso de usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneUserProgress = async (req, res) =>{
    try {
        const { user_id } = req.params;

        let data = await user.getOneUserProgress(user_id);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir el progreso de un usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneUserProgress = async (req, res) =>{
    try {
        const { id } = req.params;

        let data = await user.deleteOneUserProgress(id);
            
        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al eliminar el recurso en la base de datos"});
        }

    } catch (error) {
        console.log("Error al eliminar un progreso de un usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}