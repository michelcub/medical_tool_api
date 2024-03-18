

const express = require('express');
const cors = require('cors');
const router = express.Router();
const recetaController = require('../controllers/recetaControllers.js');
const authenticate = require('../middleware/authenticate');

router.use(cors());

// Rutas para el CRUD de pacientes
router.post('/', authenticate, recetaController.createReceta);
module.exports = router;
