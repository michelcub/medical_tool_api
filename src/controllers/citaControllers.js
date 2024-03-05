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
    console.log('obteneinedo citas')
    console.log('semana', req.query.semana)
    console.log('year', req.query.year)
    const citas = await Cita.find({semana: req.params.semana, year: req.params.year});
    console.log('obteneinedo citas', citas)
    res.status(200).send(citas);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.updateCita = async (req, res) => {
  try {
    // Asegúrate de incluir la opción { new: true } para que la función retorne el documento actualizado.
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cita) {
      return res.status(404).send({ message: 'Cita not found' });
    }
    res.status(200).send(cita);
  } catch (error) {
    res.status(400).send(error);
  }
};
