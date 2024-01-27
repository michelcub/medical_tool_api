// controllers/pagoController.js
const Pago = require('../models/Pago');

exports.createPago = async (req, res) => {
    try {
        const nuevoPago = new Pago(req.body);
        await nuevoPago.save();
        res.status(201).send(nuevoPago);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Aquí puedes agregar más funciones para manejar otros endpoints (como obtener pagos, actualizar, etc.)
