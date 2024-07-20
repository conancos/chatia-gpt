const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
const port = process.env.PORT ?? 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la API
app.use('/api', require('./routes/api'));

app.listen(port, () => { 
    console.log(`Servidor iniciado en el puerto http://localhost:${port}`)
});