// pacienteController.js

const Paciente = require('../models/Patient');

exports.createPaciente = async (req, res) => {
    
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();
        console.log('Paciente creado con éxito')
        res.status(201).json(paciente);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.getPaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        if (!paciente) {
            console.log('Paciente no encontrado');
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        console.log('Paciente encontrado con éxito');
        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!paciente) {
            console.log('Paciente no encontrado')
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        console.log('Paciente actualizado con éxito')
        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        const paciente = await Paciente.findByIdAndDelete(req.params.id);
        if (!paciente) {
            console.log('Paciente no encontrado');
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        console.log('Paciente eliminado con éxito');
        res.json({ message: 'Paciente eliminado con éxito' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
