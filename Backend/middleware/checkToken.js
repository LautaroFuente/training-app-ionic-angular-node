import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const checkToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado se necesita token" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);

    req.client = verified;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalido." });
  }
};

export default checkToken;