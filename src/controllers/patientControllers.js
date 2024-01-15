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

exports.findPacienteByAnyField = async (req, res) => {
    try {
        const value = req.params.value;
        if (!value) {
            return res.status(400).json({ error: 'El valor de búsqueda no puede estar vacío' });
        }
        let query = {
            $or: [
                { nombre: new RegExp(value, 'i') },
                { apellido: new RegExp(value, 'i') },
                { email: new RegExp(value, 'i') },
                { telefono: new RegExp(value, 'i') },
                // Agrega aquí otros campos en los que deseas buscar
            ]
        };

        const pacientes = await Paciente.find(query);

        if (pacientes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron pacientes' });
        }

        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

