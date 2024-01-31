// citas.controller.js
const Cita = require('../models/Cita');

exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    await nuevaCita.save();
    res.status(201).send(nuevaCita);
    console.log(nuevaCita)
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find({semana: req.query.semana});
    res.status(200).send(citas);
  } catch (error) {
    res.status(400).send(error);
  }
}