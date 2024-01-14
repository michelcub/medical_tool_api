// app.js
const express = require('express');
const mongoose = require('mongoose');

/*import routes */
const authRoutes = require('./src/routes/authRoutes')
const pacienteRoutes = require('./src/routes/patientRoutes');


/*import routes */

const app = express();
app.use(express.json()); // para parsear body de tipo JSON

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));