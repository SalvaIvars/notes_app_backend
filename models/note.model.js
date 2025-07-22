const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
     required: true
    },
    titulo: { type: String, required: true},
    subtitulo: { type: String },
    fecha: { type: String,  },
    hora : { type: String, },
    contenido: { type: String, required: true}
    }, {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema)