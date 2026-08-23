const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// A diferencia del isbn en la guía de libros, aquí el id SÍ lo genera
// la base de datos automáticamente (autoIncrement), igual que en el
// index.js original con el array en memoria (nextId).
const Juego = sequelize.define('Juego', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  schema: process.env.DB_SCHEMA || 'juegos',
  tableName: 'juegos',
  timestamps: true,
});

module.exports = Juego;
