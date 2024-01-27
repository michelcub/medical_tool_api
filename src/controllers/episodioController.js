// controllers/episodioController.js
const moment = require('moment');
const Episodio = require('../models/Episodio');

exports.createEpisodio = async (req, res) => {
    try {
        const nuevoEpisodio = new Episodio(req.body);

        // Formatea la fecha actual al formato deseado (día-mes-año)
        nuevoEpisodio.date = moment().format('DD-MM-YYYY');
        await nuevoEpisodio.save();
        res.status(201).send(nuevoEpisodio);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getEpisodiosByPacienteId = async (req, res) => {
    try {
        const episodios = await Episodio.find({ paciente_id: req.params.pacienteId });
        res.status(200).send(episodios);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getEpisodiosById = async (req, res) => {
    try {
        const episodio = await Episodio.find({ _id: req.params.id });
        res.status(200).send(episodio);
    } catch (error) {
        res.status(500).send(error);
    }
};