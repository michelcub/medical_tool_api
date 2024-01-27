// models/episodio.js
const mongoose = require('mongoose');

const episodioSchema = new mongoose.Schema({
    paciente_id: String,
    employee_id: String,
    employee_charge: String,
    peso: String,
    altura: String,
    imc: String,
    anamnesis: String,
    sintomas: String,
    diagnostico: String,
    comentarios: String,
    prescripcion: Array,
    documentos: [String],
    imagenes: [String],
    cobrado: Boolean,
    servicios: Array,
    date: String,
});

module.exports = mongoose.model('Episodio', episodioSchema);
