import { userEmailSchema } from "../schemas/User";
import { user } from "../servicesPrisma/userService";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function checkPassword(CorrectPassword, inputPassword) {
    const match = await bcrypt.compare(inputPassword, CorrectPassword);
    return match;
}

export const login = async (req, res) => {
    try {
        const { email, password} = req.body;        

        const result = userEmailSchema.safeParse({email});

        if(result.succes){
            let searchUser = user.getOneUser(email);

            if(searchUser != null){
                const match = await checkPassword(
                    searchUser[0].password,
                    password
                  );
            
                  if (match) {
                    data = await employeds.getOneEmployed(dni);
                    const token = jwt.sign({ dni }, process.env.JWT_KEY, {
                      expiresIn: "30m",
                    });
                    res.status(200).json({ token, data });
                  } else {
                    res.status(401).json({ error: "Contraseña incorrecta" });
                  }
            }
            else{
                return res.status(401).json({Message:"El email ingresado no existe"});
            }
        }
        else{
            console.error("Errores de validacion", result.error.errors);
            return res.status(400).json({ errors: result.error.format() });
        }
    } catch (error) {
        console.log("Erro al loguear al usuario en el controlador ", error);
        return res.status(500).json({Message: "Error interno en el servidor"});
    }
}