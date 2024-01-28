// controllers/pagoController.js
const Pago = require('../models/Pago');

exports.createPago = async (req, res) => {
    try {
        const nuevoPago = new Pago(req.body);
        await nuevoPago.save();
        res.status(201).send(nuevoPago);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.getPagosByPacienteId = async (req, res) => {
    try {
        const pagos = await Pago.find({ paciente_id: req.params.pacienteId });
        res.status(200).send(pagos);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


exports.updatePago = async (req, res) => {
    try {
        const pagoId = req.params.id;
        const datosActualizados = req.body;

        const pagoActualizado = await Pago.findByIdAndUpdate(pagoId, datosActualizados, { new: true });

        if (!pagoActualizado) {
            return res.status(404).send('Pago no encontrado');
        }

        res.status(200).send(pagoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};