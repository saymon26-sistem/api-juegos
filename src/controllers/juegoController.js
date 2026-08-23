const Juego = require('../models/juego');

// GET /juegos — devuelve todos los registros
const obtenerTodos = async (req, res) => {
  try {
    const juegos = await Juego.findAll();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos', detalle: error.message });
  }
};

// GET /juegos/:id — devuelve un registro por su id
const obtenerUno = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ error: `No se encontró el juego con id ${id}` });
    }
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el juego', detalle: error.message });
  }
};

// POST /juegos — crea un nuevo registro (el id lo asigna la base de datos)
const crear = async (req, res) => {
  try {
    const { titulo, genero, año, plataforma, disponible } = req.body;

    if (!titulo || !genero) {
      return res.status(400).json({ error: 'Los campos titulo y genero son obligatorios' });
    }

    const nuevoJuego = await Juego.create({
      titulo,
      genero,
      año: año || null,
      plataforma: plataforma || null,
      disponible: disponible !== undefined ? disponible : true,
    });

    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el juego', detalle: error.message });
  }
};

// PUT /juegos/:id — reemplaza los campos del registro existente (el id no cambia)
const actualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ error: `No se encontró el juego con id ${id}` });
    }

    const { titulo, genero, año, plataforma, disponible } = req.body;
    if (!titulo || !genero) {
      return res.status(400).json({ error: 'Los campos titulo y genero son obligatorios' });
    }

    await juego.update({ titulo, genero, año, plataforma, disponible });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el juego', detalle: error.message });
  }
};

// DELETE /juegos/:id
const eliminar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ error: `No se encontró el juego con id ${id}` });
    }
    await juego.destroy();
    res.json({ mensaje: 'Registro eliminado', eliminado: juego });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el juego', detalle: error.message });
  }
};

module.exports = { obtenerTodos, obtenerUno, crear, actualizar, eliminar };
