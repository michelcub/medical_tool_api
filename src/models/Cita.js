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
    type: Object,
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
    year: {
        type: String,
        required: true
    },
    here: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
