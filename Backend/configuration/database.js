import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export let connection;

export async function connect() {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT || 3306,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      console.log("Se establecio conexion con la base de datos");
    } catch (err) {
      console.error("Surgio un error al establecer conexion:", err);
    }
  }
  
  export async function closeConnection() {
    if (connection) {
      try {
        await connection.end();
        console.log("Conexion cerrada con la base de datos");
      } catch (err) {
        console.error("Surgio un error al cerrar la conexion:", err);
      }
    }
  }