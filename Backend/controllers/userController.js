import { userSchema, userEmailSchema, userIdSchema } from "../schemas/User";
import { user } from "../servicesPrisma/userService";

export const getAllUsers = async (req, res) =>{
    try {
        let data = await user.getAllUsers();

        if(data != null){
            return res.status(200).json(data);
        }else{
            return res.status(500).json({Error:"Error al obtener todos los recursos en la base de datos"});
        }
        
    } catch (error) {
        console.log("Error al conseguir todos los usuarios en el controlador", error);
        return res.status(500).json({message: "Error interno en el servidor"})
        
    }
}

export const addUser = async (req, res) =>{
    try {
        let result = userSchema.safeParse(req.body);

        if(result.success){
            let { email } = req.body;
            let existingUser = await user.getOneUser(email);

            if(existingUser != null){
                return res.status(409).json({Message:"El usuario a crear ya existe"});
            }

            let data = await user.addUser(req.body);

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
        console.log("Error al agregar usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const getOneUser = async (req, res) =>{
    try {
        const { email } = req.params;
        const result = userEmailSchema.safeParse({email});

        if(result.success){
            let data = await user.getOneUser(email);
            
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
        console.log("Error al conseguir un usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}

export const deleteOneUser = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = userIdSchema.safeParse(id);

        if(result.success){
            let data = await user.deleteOneUser(id);
            
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
        console.log("Error al eliminar un usuario en el controlador", error);
        return res.status(500).json({ message: "Error interno en el servidor" });
        
    }
}