import { RoutineSchema, RoutineIdSchema } from "../schemas/Routine.js";
import { userIdSchema } from "../schemas/User.js";
import { routineExercise } from "../servicesPrisma/routineExerciseService.js";
import { routine } from "../servicesPrisma/routineService.js";

export const getAllRoutines = async (req, res) =>{
    try {
        let data = await routine.getAllRoutines();

        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todas las rutinas en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const getAllRoutinesFromOneUser = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = userIdSchema.safeParse({id});

        if(result.success){
            let data = await routine.getAllRoutinesFromOneUser(id);
            
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
        console.log("Error al conseguir todas las rutinas del usuario en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addRoutine = async (req, res) =>{
    try {
        let {name, description, userId, listExercises} = req.body;
        let result = RoutineSchema.safeParse({name, description});

        if(result.success){
            let existingRoutine = await routine.getOneRoutine(name);

            if(existingRoutine != null){
                return res.status(409).json({Message:"La rutina a crear ya existe"});
            }

            let data = await routine.addRoutine({name, description, userId});

            if(data != null){

                const exercisePromises = listExercises.map(exercise =>
                    routineExercise.addRoutineExercise({
                        routineId: data.id,
                        exerciseId: exercise.exercise.id,
                        repetitions: exercise.repetitions,
                        sets: exercise.sets,
                        weight: exercise.weight
                    })
                );

                await Promise.all(exercisePromises);
                
                return res.status(201).json(data);
            }else{
                return res.status(500).json({Error:"Error al crear el recurso en la base de datos"});
            }

        }else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }

    } catch (error) {
        console.log("Error al agregar la rutina en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneRoutine = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = RoutineIdSchema.safeParse({id});

        if(result.success){
            let data = await routine.getOneRoutine(id);
            
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
        console.log("Error al conseguir una rutina en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneRoutine = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = RoutineIdSchema.safeParse(id);

        if(result.success){
            let data = await routine.deleteOneRoutine(id);
            
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
        console.log("Error al eliminar una rutina en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}