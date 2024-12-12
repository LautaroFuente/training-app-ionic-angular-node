import { ExerciseIdSchema, ExerciseNameSchema, ExerciseSchema } from "../schemas/Exercise.js";
import { exercise } from "../servicesPrisma/exerciseService.js"

export const getAllExercises = async (req, res) =>{
    try {
        let data = await exercise.getAllExercises();

        if(data != null){
            res.status(200).json(data);
        }else{
            res.status(500).json({Error:"Error al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todos los ejercicios en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addExercise = async (req, res) =>{
    try {
        let result = ExerciseSchema.safeParse(req.body);

        if(result.success){
            let { name } = req.body;
            let existingExercise = await exercise.getOneExercise(name);

            if(existingExercise != null){
                return res.status(409).json({Message:"El ejercicio a crear ya existe"});
            }

            let data = await exercise.addExercise(req.body);

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
        console.log("Error al agregar ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneExercise = async (req, res) =>{
    try {
        const { name } = req.params;
        const result = ExerciseNameSchema.safeParse({name});

        if(result.success){
            let data = await exercise.getOneExercise(name);
            
            if(data != null){
                res.status(200).json(data);
            }else{
                return res.status(500).json({Error:"Error al obtener el recurso en la base de datos"});
            }
        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }
        
    } catch (error) {
        console.log("Error al conseguir un ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneExercise = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = ExerciseIdSchema.safeParse(id);

        if(result.success){
            let data = await exercise.deleteOneExercise(id);
            
            if(data != null){
                res.status(200).json(data);
            }else{
                return res.status(500).json({Error:"Error al eliminar el recurso en la base de datos"});
            }
        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }

    } catch (error) {
        console.log("Error al eliminar un ejercicio en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}