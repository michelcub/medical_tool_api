// models/pago.js
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    paciente_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario' // Asumiendo que tienes un modelo Usuario
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // este es el medico que crea la consulta
    },
    eployee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // este es el empleado que cobra
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cobrado: {
        type: Boolean,
        required: true,
    },
    metodo_pago: {
        type: String,
        enum: ['Efectivo', 'Tarjeta', 'Transferencia']
    },
    servicios: {
        type: Array,
        required: true
    },
    episodio_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Episodio'
    }
});

module.exports = mongoose.model('Pago', pagoSchema);
