// routes/pagoRoutes.js
const express = require('express');
const cors = require('cors');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const pagoController = require('../controllers/pagoController');

router.use(cors());

router.post('/',authenticate, pagoController.createPago);
router.get('/paciente/:pacienteId', authenticate, pagoController.getPagosByPacienteId);
router.put('/:id',authenticate, pagoController.updatePago);
// Aquí puedes agregar más rutas para otras operaciones

module.exports = router;
