// pacienteRoutes.js

const express = require('express');
const cors = require('cors');
const router = express.Router();
const pacienteController = require('../controllers/patientControllers.js');
const authenticate = require('../middleware/authenticate');

router.use(cors());

// Rutas para el CRUD de pacientes
router.post('/', authenticate, pacienteController.createPaciente);
router.get('/:id', authenticate, pacienteController.getPaciente);
router.get('/find/:value', authenticate, pacienteController.findPacienteByAnyField);
router.put('/:id', authenticate, pacienteController.updatePaciente);
router.delete('/:id', authenticate, pacienteController.deletePaciente);

module.exports = router;
