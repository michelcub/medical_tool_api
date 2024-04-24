const express = require('express');
const multer = require('multer');
const router = express.Router();
const cors = require('cors');
const authenticate = require('../middleware/authenticate');
const fs = require('fs'); // Para manejar el sistema de archivos
const path = require('path'); // Para trabajar con rutas de archivos

// Asegúrate de tener el modelo User correctamente definido
const User = require('../models/User');

// Verificar la existencia del directorio de destino y crearlo si no existe
const recetasDir = './recetas';
fs.mkdirSync(recetasDir, { recursive: true });

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, recetasDir); // Usa la constante del directorio
  },
  filename: function (req, file, cb) {
    // Asegúrate de que el nombre del archivo final tenga la extensión .pdf
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Filtrar solo archivos PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Formato no soportado, por favor sube un archivo PDF.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.use(cors());

// Ruta para cargar archivos PDF
router.post('/', authenticate, upload.single('pdffile'), (req, res, next) => {
  try {
    let userId = req.body.user_id; // Obtener el user_id del cuerpo de la solicitud
    userId = userId.replace(/"/g, '');
    if (req.file) {
      const file = req.file;
      const oldPath = file.path;
      // Asegúrate de que el nombre del archivo no incluya comillas y termine en .pdf
      console.log('oldPath>>>>>>>', oldPath);
      const newPath = path.join(file.destination, `${userId}.pdf`); // Removidas las comillas dobles
      console.log('newPath>>>>>>>', newPath);
      // Renombrar el archivo
      fs.rename(oldPath, newPath, function(err) {
        if (err) {
          return next(err);
        }
        

        // Confirma el éxito de la carga y el renombramiento
        res.status(200).send({ message: 'Archivo PDF cargado y renombrado con éxito', filename: `${userId}.pdf` });
      });
    } else {
      throw new Error('No se subió ningún archivo PDF.');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
