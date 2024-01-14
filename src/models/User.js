const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
    key: { 
        type: String, 
        unique: true, 
        required: true, 
        default: () => uuid.v4() 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true, 
        maxlength: 150 
    },
    last_name: { 
        type: String, 
        required: true, 
        maxlength: 150 
    },
    password: { 
        type: String, 
        required: true, 
        maxlength: 100 
    },
    active: { 
        type: Boolean, 
        default: true 
    },
    date_joined: { 
        type: Date, 
        default: Date.now 
    }
});


// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Método para verificar la contraseña
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Crear y exportar el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
