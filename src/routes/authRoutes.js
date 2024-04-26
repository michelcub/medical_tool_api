
const cors = require('cors');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.use(cors());

// Ruta para registrar usuario
router.post('/register', userController.register);


// Ruta para iniciar sesión
router.post('/login', userController.login);

router.get('/users/:id', userController.getUsers);

module.exports = router;
