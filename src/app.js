const express = require('express');
const app = express();

app.use(express.json());

// Rutas
const juegoRoutes = require('./routes/juegoRoutes');
app.use('/juegos', juegoRoutes);

module.exports = app;
