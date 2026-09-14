const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES BASE ---

// Parsing de JSON para body de solicitudes
app.use(express.json());

// Logger simple de solicitudes (Middleware personalizado)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// --- RUTAS ---

// GET /health
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

// POST /move
app.post('/move', (req, res) => {
  const { direction, distance } = req.body;

  // Validación básica del Payload JSON
  const validDirections = ['up', 'down', 'left', 'right', 'forward', 'backward'];
  
  if (!direction || !validDirections.includes(direction.toLowerCase())) {
    return res.status(400).json({
      error: 'Bad Request',
      message: `El campo 'direction' es obligatorio y debe ser uno de: ${validDirections.join(', ')}.`
    });
  }

  if (typeof distance !== 'number' || distance <= 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: "El campo 'distance' es obligatorio y debe ser un número mayor a 0."
    });
  }

  // Lógica exitosa
  res.status(200).json({
    message: 'Movimiento registrado con éxito',
    data: {
      direction: direction.toLowerCase(),
      distance
    }
  });
});

// --- MANEJO DE ERRORES Y RUTAS NO ENCONTRADAS ---

// Respuesta 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `La ruta ${req.originalUrl} no existe.`
  });
});

// Middleware global de errores (Respuesta 500 y JSON malformado)
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);

  // Captura error si envían un JSON con sintaxis rota en el body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'El cuerpo de la solicitud contiene un JSON inválido.'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Ocurrió un error inesperado en el servidor.'
  });
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});