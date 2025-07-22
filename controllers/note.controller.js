const Note = require('../models/note.model');

// Obtener todas las notas
exports.getNotas = async (req, res) => {
  try {
    const notas = await Note.find().sort({ createdAt: -1 });
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};

// Crear nueva nota
exports.createNota = async (req, res) => {
  const { titulo, subtitulo, fecha, hora, contenido } = req.body;
  try {
    const nuevaNota = new Note({ titulo, subtitulo, fecha, hora, contenido });
    await nuevaNota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la nota' });
  }
};

// Eliminar nota
exports.deleteNota = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Nota eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};
