import app from "./app.js";
import dotenv from "dotenv";
import pool from "./configuration/database.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("🔌 Pool de conexiones MySQL cerrado correctamente");
    process.exit(0);
  } catch (err) {
    console.error("Error al cerrar el pool:", err);
    process.exit(1);
  }
});
