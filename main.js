const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 2024;

app.use(bodyParser.json());

app.post('/guardar', (req, res) => {
  const { correo } = req.body;

  if (!correo || typeof correo !== 'string') {
    return res.status(400).json({ error: 'Formato de datos incorrecto' });
  }

  const csvData = correo;

  fs.appendFile('correos.csv', csvData + '\n', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al guardar en el archivo CSV' });
    }
    res.status(200).json({ mensaje: 'Correo guardado correctamente' });
  });
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en http://127.0.0.1:${port}`);
});
