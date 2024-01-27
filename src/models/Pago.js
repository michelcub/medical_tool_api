// models/pago.js
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario' // Asumiendo que tienes un modelo Usuario
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
    }
});

module.exports = mongoose.model('Pago', pagoSchema);
