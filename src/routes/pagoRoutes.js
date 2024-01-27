// routes/pagoRoutes.js
const express = require('express');
const cors = require('cors');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

cors(cors())

router.post('/pagos',authenticate, pagoController.createPago);

// Aquí puedes agregar más rutas para otras operaciones

module.exports = router;
