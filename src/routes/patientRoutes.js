// pacienteRoutes.js

const express = require('express');
const cors = require('cors');
const router = express.Router();
const pacienteController = require('../controllers/patientControllers.js');

router.use(cors());

// Rutas para el CRUD de pacientes
router.post('/', pacienteController.createPaciente);
router.get('/:id', pacienteController.getPaciente);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
