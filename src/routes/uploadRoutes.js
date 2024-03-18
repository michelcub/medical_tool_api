const express = require('express');
const multer = require('multer');
const router = express.Router();
const cors = require('cors');
const authenticate = require('../middleware/authenticate');
const fs = require('fs'); // Agrega esta línea para importar el módulo fs
const path = require('path'); // Agrega esta línea para importar el módulo path
const User = require('../models/User'); // Agrega esta línea para importar el modelo User

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './recetas'); // Asegúrate de que este directorio exista
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.xml'); // Guardar como .xml
  }
});

// Filtrar solo archivos XML
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/xml' || file.mimetype === 'application/xml') {
    cb(null, true);
  } else {
    cb(new Error('Formato no soportado, por favor sube un archivo XML.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});


router.use(cors());

// Ruta para cargar archivos XML
router.post('/', authenticate, upload.fields([{ name: 'xmlfile', maxCount: 1 }]), (req, res, next) => {
  try {
    const userId = req.body.user_id; // Obtener el user_id del cuerpo de la solicitud
    if (req.files && req.files.xmlfile && req.files.xmlfile.length > 0) {
      const file = req.files.xmlfile[0];
      const oldPath = file.path;
      const newPath = path.join(file.destination, JSON.parse(userId) + '.xml');

      // Renombrar el archivo
      fs.rename(oldPath, newPath, function(err) {
        if (err) {
          return next(err);
        }
        // Aquí puedes continuar con cualquier otra lógica que necesites después de renombrar el archivo
        res.status(200).send({ message: 'Archivo cargado y renombrado con éxito', filename:  JSON.parse(userId) + '.xml'});
      });
    } else {
      throw new Error('No se subió ningún archivo.');
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
