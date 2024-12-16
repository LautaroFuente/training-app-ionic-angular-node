import { RoutineExerciseSchema, RoutineExerciseIdSchema } from "../schemas/RoutineRoutineExercise.js"
import { routineExercise } from "../servicesPrisma/routineExerciseService.js";


export const getAllRoutineRoutineExercises = async (req, res) =>{
    try {
        let data = await routineExercise.getAllRoutineExercises();

        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todos las relaciones rutina/ejercicio en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addRoutineExercise = async (req, res) =>{
    try {
        let result = RoutineExerciseSchema.safeParse(req.body);

        if(result.success){

            let data = await routineExercise.addRoutineExercise(req.body);

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
        console.log("Error al agregar la relacion rutina/ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneRoutineExercise = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = RoutineExerciseIdSchema.safeParse(id);

        if(result.success){
            let data = await routineExercise.getOneRoutineExercise(id);
            
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
        console.log("Error al conseguir una relacion rutina/ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneRoutineExercise = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = RoutineExerciseIdSchema.safeParse(id);

        if(result.success){
            let data = await routineExercise.deleteOneRoutineExercise(id);
            
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
        console.log("Error al eliminar una relacion rutina/ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}