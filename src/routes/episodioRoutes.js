// routes/episodios.js
const express = require('express');
const cors = require('cors');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const episodioController = require('../controllers/episodioController');

router.use(cors());

router.post('/new', authenticate, episodioController.createEpisodio);
router.get('/paciente/:pacienteId', authenticate, episodioController.getEpisodiosByPacienteId);
router.get('/:id', authenticate, episodioController.getEpisodiosById);
// Aquí puedes agregar más rutas

module.exports = router;
