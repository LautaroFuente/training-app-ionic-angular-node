import app from "./app.js"
import dotenv from "dotenv";
import process from "process";
import { connect, closeConnection } from "./configuration/database.js"

dotenv.config();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`La aplicación está funcionando en http://localhost:${port}`);
    });

    process.on("SIGINT", async () => {
      try {
        await closeConnection();
        console.error("Se ha cerrado la conexion con la base de datos");
        process.exit(0);
      } catch (err) {
        console.error("Error al cerrar la conexion:", err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error("Error al iniciar la app:", err);
    process.exit(1);
  }
})();