require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  // Vérifie si la base de données existe
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  await connection.query(`USE ${DB_NAME}`);

  // Charge le script SQL contenant les tables à créer, mais uniquement si elles n'existent pas
  const sql = fs.readFileSync("./database.sql", "utf8");

  // Vérifie si les tables existent déjà avant d'exécuter le script SQL
  const [tables] = await connection.query(`SHOW TABLES`);
  if (tables.length === 0) {
    console.log("Aucune table détectée. Création des tables...");
    await connection.query(sql);
  } else {
    console.log("Les tables existent déjà. Migration non nécessaire.");
  }

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
