const mysql = require('mysql2');

// Tomar la variable de entorno MYSQL_URL (proporcionada por Railway)
const mysqlUrl = process.env.MYSQL_URL;

if (!mysqlUrl) {
  throw new Error('La variable MYSQL_URL no está definida en el entorno');
}

// Crear el pool directamente con la URL
const pool = mysql.createPool(mysqlUrl);

module.exports = pool.promise();