// cita.model.js
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  paciente: {
    type: String,
    required: true
  },
    doctor: {
        type: String,
    },
    motivo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: 'No realizada',
        required: true 
    },
    semana: {
        type: String,
        required: true
    },
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
