const Note = require('../models/note.model');

exports.getNotas = async (req, res) => {
  try {
    const notas = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notas);
  } catch (error) {
    console.error('❌ Error al obtener notas:', error.message);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};


// Crear nueva nota
exports.createNota = async (req, res) => {
  const { titulo, subtitulo, fecha, hora, contenido } = req.body;

  try {
    const nuevaNota = new Note({
      titulo,
      subtitulo,
      fecha,
      hora,
      contenido,
      userId: req.user._id  // 🔑 importante
    });

    await nuevaNota.save();
    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('❌ Error al crear nota:', error.message);
    res.status(400).json({ error: 'Error al crear la nota' });
  }
};


// Eliminar nota
exports.deleteNota = async (req, res) => {
  try {
    const nota = await Note.findOne({ _id: req.params.id, userId: req.user._id });

    if (!nota) {
      return res.status(404).json({ error: 'Nota no encontrada o no autorizada' });
    }

    await nota.deleteOne();
    res.json({ mensaje: 'Nota eliminada' });
  } catch (error) {
    console.error('❌ Error al eliminar nota:', error.message);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};

