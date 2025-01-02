import { MuscleGroupIdSchema, MuscleGroupNameSchema, MuscleGroupSchema } from "../schemas/MuscleGroup.js";
import { muscleGroup } from "../servicesPrisma/muscleGroupService.js";

export const getAllMuscleGroups = async (req, res) =>{
    try {
        let data = await muscleGroup.getAllMuscleGroups();

        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"ErroR al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todos los grupos musculares en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addMuscleGroup = async (req, res) =>{
    try {
        let result = MuscleGroupSchema.safeParse(req.body);

        if(result.success){
            let { name } = req.body;
            let existingMuscleGroup = await muscleGroup.getOneMuscleGroup(name);

            if(existingMuscleGroup != null){
                return res.status(409).json({Message:"El grupo muscular a crear ya existe"});
            }

            let data = await muscleGroup.addMuscleGroup(req.body);

            if(data != null){
                return res.status(201).json(data);
            }else{
                return res.status(500).json({Error:"Error al crear el recurso en la base de datos"});
            }

        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }

    } catch (error) {
        console.log("Error al agregar grupo muscular en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneMuscleGroup = async (req, res) =>{
    try {
        const { name } = req.params;
        const result = MuscleGroupNameSchema.safeParse({name});

        if(result.success){
            let data = await muscleGroup.getOneMuscleGroup(name);
            
            if(data != null){
                return res.status(200).json(data);
            }else{
                return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
            }
        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }
        
    } catch (error) {
        console.log("Error al conseguir un grupo muscular en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneMuscleGroup = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = MuscleGroupIdSchema.safeParse(id);

        if(result.success){
            let data = await muscleGroup.deleteOneMuscleGroup(id);
            
            if(data != null){
                return res.status(200).json(data);
            }else{
                return res.status(500).json({Error:"Error al eliminar el recurso en la base de datos"});
            }
        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }

    } catch (error) {
        console.log("Error al eliminar un grupo muscular en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}