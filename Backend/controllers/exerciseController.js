import { exercise } from "../servicesPrisma/exerciseService"

export const getAllExercises = async (req, res) =>{
    try {
        let data = await exercise.getAllExercises();
        res.status(200).json(data);
    } catch (error) {
        console.log("Error al conseguir todos los ejercicios en el servicio", error);
        throw new Error("Error al conseguir todos los ejercicios en el servicio");
        
    }
}

export const addExercise = async (req, res) =>{
    try {
        let data = await exercise.getAllExercises();
        res.status(200).json(data);
    } catch (error) {
        console.log("Error al conseguir todos los ejercicios en el servicio", error);
        throw new Error("Error al conseguir todos los ejercicios en el servicio");
        
    }
}

export const getOneExercise = async (req, res) =>{
    try {
        let data = await exercise.getAllExercises();
        res.status(200).json(data);
    } catch (error) {
        console.log("Error al conseguir todos los ejercicios en el servicio", error);
        throw new Error("Error al conseguir todos los ejercicios en el servicio");
        
    }
}

export const deleteOneExercise = async (req, res) =>{
    try {
        let data = await exercise.getAllExercises();
        res.status(200).json(data);
    } catch (error) {
        console.log("Error al conseguir todos los ejercicios en el servicio", error);
        throw new Error("Error al conseguir todos los ejercicios en el servicio");
        
    }
}