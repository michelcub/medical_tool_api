const mongoose = require('mongoose');
const uuid = require('uuid');

const pacienteSchema = new mongoose.Schema({
    key: {
        type: mongoose.Schema.Types.UUID,
        default: uuid.v4,
        unique: true
    },
    comentario: {
        type: String,
        default: 'n/a',
        maxlength: 400
    },
    nombre: {
        type: String,
        default: 'n/a',
        maxlength: 50,
        required: true
    },
    apellidos: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    fecha_nacimiento: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    tipo_documento: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    documento_identidad: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    sexo: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    telefono: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    telefono_adicional: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    email: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    calle: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    numero: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    puerta: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    pais: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    ciudad: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    cp: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    aseguradora: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    numero_seguro: {
        type: String,
        default: 'n/a',
        maxlength: 100
    },
    otros_datos: {
        type: String,
        default: 'n/a'
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
        maxlength: 200
    },
    LPD: {
        type: String,
        default: 'n/a',
        maxlength: 200
    }
});

module.exports = mongoose.model('Paciente', pacienteSchema);
