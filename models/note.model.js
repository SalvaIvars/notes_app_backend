const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    titulo: { type: String, required: true},
    subtitulo: { type: String },
    fecha: { type: String,  },
    hora : { type: String, },
    contenido: { type: String, required: true}
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema)