// controllers/episodioController.js
const moment = require('moment');

// Ruta del archivo PDF de entrada y salida
let inputPdfPath = 'test.pdf';
let outputPdfPath = 'modified_page_only.pdf'; // Nombre de archivo de salida modificado




const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;



const elementosParaAgregar = [
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
    y: 724,
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

async function addTextToPdfAndSaveModifiedPageOnly() {
  try {
    const inputPdfBytes = await fs.readFile(inputPdfPath);

    const inputPdfDoc = await PDFDocument.load(inputPdfBytes);

    const firstPage = inputPdfDoc.getPages()[0];

    elementosParaAgregar.forEach((elemento) => {
      firstPage.drawText(elemento.texto, {
        x: elemento.x,
        y: elemento.y,
        size: 12,
        color: rgb(0, 0, 0), 
      });
    });

    const newPdfDoc = await PDFDocument.create();

    const [importedPage] = await newPdfDoc.copyPages(inputPdfDoc, [0]);
    
    newPdfDoc.addPage(importedPage);

    const modifiedPagePdfBytes = await newPdfDoc.save();

    await fs.writeFile(outputPdfPath, modifiedPagePdfBytes);
    
    //removePageFromPdf(0)
    console.log('Página modificada guardada con éxito en un nuevo archivo PDF.');
  } catch (error) {
    console.error('Error al agregar texto y guardar la página modificada:', error);
  }
}


async function removePageFromPdf(pageIndex) {
  try {
    const inputPdfBytes = await fs.readFile(inputPdfPath);

    const pdfDoc = await PDFDocument.load(inputPdfBytes);

    pdfDoc.removePage(pageIndex);

    const modifiedPdfBytes = await pdfDoc.save();

    await fs.writeFile(inputPdfPath, modifiedPdfBytes);

    console.log(`Página ${pageIndex + 1} eliminada con éxito.`);
  } catch (error) {
    console.error('Error al eliminar la página del PDF:', error);
  }
}


//addTextToPdfAndSaveModifiedPageOnly();




exports.createReceta = async (req, res) => {
    try {

        // Formatea la fecha actual al formato deseado (día-mes-año)
        let paciente = await req.body.paciente;
        let medicamento = await req.body.medicamento;
        let duracion = await req.body.duracion;
        let pauta = await req.body.pauta;
        let unidades = await req.body.unidades;
        let fecha_receta = await moment().format('DD-MM-YYYY');
        let paciente_data = await req.body.paciente_data;

        await console.log('--------------------------------')
        await console.log('date', date)
        await console.log('paciente', paciente)
        await console.log('medicamento', medicamento)
        await console.log('duracion', duracion)
        await console.log('pauta', pauta)
        await console.log('unidades', unidades)
        await console.log('fecha_receta', fecha_receta)
        await console.log('paciente_data', paciente_data)
        await console.log('--------------------------------')

        res.status(201).send(nuevoEpisodio);
    } catch (error) {
        res.status(500).send(error);
    }
};



