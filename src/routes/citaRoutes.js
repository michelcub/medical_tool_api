// citas.route.js
const express = require('express');
const cors = require('cors');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const citasController = require('../controllers/citaControllers');


router.use(cors());
// Ruta para crear una nueva cita
router.post('/', authenticate, citasController.crearCita);
router.get('/:semana/:year', authenticate, citasController.getCitas);
router.put('/:id', authenticate, citasController.updateCita);

module.exports = router;
