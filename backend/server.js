const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el formulario
app.post('/api/form', (req, res) => {
  const { nombre, apellido, edad, telefono, correo } = req.body;
  console.log('Form data received:', { nombre, apellido, edad, telefono, correo });
  res.json({ message: 'Datos del formulario recibidos correctamente' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
