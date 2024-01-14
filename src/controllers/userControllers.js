// userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para registrar usuario
exports.register = async (req, res) => {
    try {
        const { name, last_name, email, password } = req.body;
        user_exist = User.findOne({ email });
        if (user_exist) {
            console.log('El usuario ya existe');
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        const user = new User({ name, last_name, email, password });
        await user.save();

        // Crear token JWT
        const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt', { expiresIn: '1d' });
        console.log('Usuario registrado con éxito');
        res.status(201).json({ message: 'Usuario registrado con éxito', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.checkPassword(password))) {
            console.log('Credenciales inválidas');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Crear token JWT
        const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt', { expiresIn: '1d' });
        console.log('inicio de sesion exitoso');
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
