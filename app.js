// app.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

/*import routes */
const authRoutes = require('./src/routes/authRoutes')
const pacienteRoutes = require('./src/routes/patientRoutes');
const episodiosRoutes = require('./src/routes/episodioRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');
const citaRoutes = require('./src/routes/citaRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const recetaRoutes = require('./src/routes/recetaRoutes');
/*import routes */

const app = express();
app.use(express.json()); // para parsear body de tipo JSON

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/episodio', episodiosRoutes);
app.use('/api/pagos', pagoRoutes)
app.use('/api/citas', citaRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/recetas', recetaRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
