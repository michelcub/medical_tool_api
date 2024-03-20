// controllers/episodioController.js
const e = require('express');
const moment = require('moment');

// Ruta del archivo PDF de entrada y salida
let inputPdfPath = 'test.pdf';
let outputPdfPath = 'modified_page_only.pdf'; // Nombre de archivo de salida modificado




const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;



let  elementosParaAgregar = [
  {
    type: 'unidades',
    texto: '2',
    x: 166,
    y: 684,
  },
  {
    type: 'unidades',
    texto: '1',
    x: 290,
    y: 650,
  },
  {
    type: 'pauta',
    texto: 'c/ 8h',
    x: 318,
    y: 650,
  },
  {
    type: 'medicamento',
    texto: 'Paracetamol 500mg',
    x: 46,
    y: 630,
  },
  {
    type: 'duracion',
    texto: '3 días',
    x: 290,
    y: 714,
  },
  {
    type: 'paciente_data',
    texto: `
DNI: 12345678A
Nombre: Juan Pérez
Fecha: 01/01/2021
    `,
    x: 370,
    y: 704,
  },
  {
    type: 'fecha_receta',
    texto: '01   01   2024',
    x: 490,
    y: 556
  },
  {
    type: 'unidades',
    texto: '1',
    x: 166,
    y: 272,
  },
  {
    type: 'unidades',
    texto: '1',
    x: 290,
    y: 240,
  },
  {
    type: 'pauta',
    texto: 'c/ 8h',
    x: 318,
    y: 240,
  },
  {
    type: 'medicamento',
    texto: 'Paracetamol 500mg',
    x: 46,
    y: 220,
  },
  {
    type: 'duracion',
    texto: '3 días',
    x: 290,
    y: 304,
  },
  {
    type: 'paciente_data',
    texto: `
Juan Pérez 01/01/2021
12345678A
    `,
    x: 370,
    y: 314,
  },
  {
    type: 'fecha_receta',
    texto: '01   01   2024',
    x: 490,
    y: 172
  },
];

function agregarSaltoLinea(texto, maxLongitud = 40) {
  const segmentos = [];
  let inicio = 0;

  while (inicio < texto.length) {
    // Determina el final del segmento considerando la longitud máxima
    let fin = Math.min(inicio + maxLongitud, texto.length);
    let corte = fin;

    // Si no estamos al final del texto y el siguiente carácter no es un espacio,
    // buscamos el último espacio en el segmento para cortar por ahí.
    if (fin < texto.length && texto[fin] !== ' ') {
      let ultimoEspacio = texto.lastIndexOf(' ', fin);
      if (ultimoEspacio > inicio) {
        corte = ultimoEspacio;
      }
    }

    // Agrega el segmento actual a la lista de segmentos
    segmentos.push(texto.slice(inicio, corte));

    // Prepara `inicio` para la próxima iteración
    // Si el corte fue en un espacio, empezar después de ese espacio
    inicio = corte + (texto[corte] === ' ' ? 1 : 0);
  }

  return segmentos.join("\n");
}



async function modifyPdfWithAllChanges(inputPdfPath, outputPdfPath, modificaciones) {
  try {
    const inputPdfBytes = await fs.readFile(inputPdfPath);
    const pdfDoc = await PDFDocument.load(inputPdfBytes);
    console.log('modificaciones>>>>>>>>>>>>>>>>>>>>', JSON.stringify(modificaciones));
    modificaciones.forEach(modificacion => {
      const { pageIndex, elementosParaAgregar } = modificacion;
      if (pageIndex < 0 || pageIndex >= pdfDoc.getPages().length) {
        console.warn(`Índice de página fuera de rango: ${pageIndex}`);
        return; // Continúa con la siguiente modificación si el índice está fuera de rango
      }

      const page = pdfDoc.getPages()[pageIndex];
      console.log('page>>>>>>>>>>>>>>>>>>>>', modificacion);
      elementosParaAgregar.forEach(({ texto, x, y, size }) => {
        
        console.log('texto>>>>>>>>>>>>>>>>>>>>', texto);

        // Asumimos que todos los textos ya están correctamente convertidos a string
        page.drawText(texto.toString(), {
          x,
          y,
          size: size || 8,
          color: rgb(0, 0, 0), // Por defecto, el texto es negro
        });
      });
    });

    const modifiedPdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPdfPath, modifiedPdfBytes);
    console.log('Documento PDF modificado guardado con éxito.');
  } catch (error) {
    console.error('Error al modificar el documento PDF:', error);
  }
}


async function extraerPaginasPdf(inputPdfPath, inicio, final) {
  try {

      const existingPdfBytes = await fs.readFile(inputPdfPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pdfDocNuevo = await PDFDocument.create();

      // Asegurar que los índices de página están dentro del rango del documento
      const numeroPaginas = pdfDoc.getPageCount();
      if (inicio < 1 || final > numeroPaginas) {
          throw new Error('Rango de páginas fuera de límites.');
      }

      // Las páginas en PDFDocument están indexadas desde 0
      for (let i = inicio - 1; i < final; i++) {
          const [copiedPage] = await pdfDocNuevo.copyPages(pdfDoc, [i]);
          pdfDocNuevo.addPage(copiedPage);
      }

      const pdfBytes = await pdfDocNuevo.save();
      return Buffer.from(pdfBytes);
  } catch (error) {
      console.error('Error al extraer páginas del PDF:', error);
      throw error; // Re-lanzar el error para manejo externo
  }
}


//addTextToPdfAndSaveModifiedPageOnly();




exports.createReceta = async (req, res) => {
  try {
    if (!Array.isArray(req.body.recetas)) {
      return res.status(400).send("El campo 'recetas' es requerido y debe ser un array.");
    }
    const recetas = req.body.recetas;
    const paciente_id = req.body.paciente_id;
    let doctor_id = req.body.doctor_id.replace(/"/g, ''); // Limpiar comillas
    const date = req.body.date;

    const inputPdfPath = `./recetas/${doctor_id}.pdf`;
    const outputPdfPath = `./recetas/${doctor_id}.pdf`; // Usar un archivo modificado

    let modificaciones = recetas.map((receta, index) => {
      // Clonar la plantilla para cada receta
      let elementosClonadosParaAgregar = JSON.parse(JSON.stringify(elementosParaAgregar));
      
      // Modificar los elementos clonados con los datos específicos de la receta
      elementosClonadosParaAgregar = elementosClonadosParaAgregar.map(elemento => {
        switch (elemento.type) {
          case 'unidades':
            elemento.texto = receta.unidades.toString(); // Asegurarse de que sea una cadena
            break;
          case 'pauta':
            elemento.texto = receta.pauta;
            break;
          case 'medicamento':
            elemento.texto =  agregarSaltoLinea(receta.nombre);
            break;
          case 'duracion':
            elemento.texto = receta.duracion;
            break;
          case 'paciente_data':
            elemento.texto = `DNI: ${paciente_id}\nNombre: Juan Pérez\nFecha: ${date}`;
            break;
          // Añadir más casos según sea necesario
        }
        return elemento;
      });

      return {
        pageIndex: index, // Asumiendo que cada receta ocupa una página nueva
        elementosParaAgregar: elementosClonadosParaAgregar
      };
    });

    await modifyPdfWithAllChanges(inputPdfPath, outputPdfPath, modificaciones);
    const pdfBuffer = await extraerPaginasPdf(inputPdfPath, 1, recetas.length);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', `attachment; filename=${doctor_id}.pdf`);
    console.log('Receta creada correctamente.');
    res.status(201).send(pdfBuffer);
  } catch (error) {
    console.error('Error al crear la receta:', error);
    res.status(500).send("Error al crear la receta");
  }
};


