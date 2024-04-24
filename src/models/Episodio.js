// models/episodio.js
const mongoose = require('mongoose');
const { circle } = require('pdfkit');



const episodioSchema = new mongoose.Schema({
    paciente_id: String,
    employee_id: String,
    employee_charge: String,
    peso: String,
    altura: String,
    imc: String,
    anamnesis: String,
    exploracion: String,
    diagnostico: String,
    pruebas_complementarias: String,
    tratamiento: String,
    detalles: String,
    prescripcion: Array,
    documentos: [String],
    imagenes: [String],
    cobrado: Boolean,
    servicios: Array,
    date: String,
    cita_id: String,
});

module.exports = mongoose.model('Episodio', episodioSchema);
