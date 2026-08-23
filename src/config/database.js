const { Sequelize } = require('sequelize');

// Cada API del proyecto se conecta al MISMO servidor PostgreSQL administrado,
// pero cada una vive en su propio schema (DB_SCHEMA) para no pisar los datos
// de las otras APIs. api-juegos usa el schema "juegos".
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
