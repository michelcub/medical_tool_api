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

        if (!user || !(await user.checkPassword(password)) || !user.active) {
            console.log('Credenciales inválidas');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Crear token JWT
        const token = jwt.sign({ userId: user._id }, 'tu_secreto_jwt', { expiresIn: '1d' });
        console.log('inicio de sesion exitoso');
        res.json({ message: 'Inicio de sesión exitoso', token, user: user._id, user_name: user.name, user_last_name: user.last_name, user_email: user.email, user_rol: user.rol, user_num_colegiado: user.num_colegiado});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
         if (!user) {
              console.log('Usuario no encontrado');
              return res.status(404).json({ error: 'Usuario no encontrado' });
         }
            console.log('Usuario encontrado con éxito');
            res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}