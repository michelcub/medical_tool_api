// routes/episodios.js
const express = require('express');
const cors = require('cors');
const router = express.Router();

const episodioController = require('../controllers/episodioController');

router.use(cors());

router.post('/new', episodioController.createEpisodio);
router.get('/paciente/:pacienteId', episodioController.getEpisodiosByPacienteId);
router.get('/:id', episodioController.getEpisodiosById);
// Aquí puedes agregar más rutas

module.exports = router;
