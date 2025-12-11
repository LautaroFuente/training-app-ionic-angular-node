import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const MAX_RETRIES = 10;
const RETRY_DELAY = 2000; // 2 segundos

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createPoolWithRetry() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Probar la conexión
      await pool.query("SELECT 1");
      console.log("✅ Conexión a MySQL establecida correctamente");
      return pool;
    } catch (err) {
      retries++;
      console.log(
        `⏳ MySQL no está listo aún... reintento ${retries}/${MAX_RETRIES}`
      );
      await wait(RETRY_DELAY);
    }
  }

  console.error("❌ No se pudo conectar a MySQL después de varios intentos");
  process.exit(1);
}

const pool = await createPoolWithRetry();
export default pool;
