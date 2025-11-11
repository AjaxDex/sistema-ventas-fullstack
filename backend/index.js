const express = require('express');
const cors = require('cors');
const app = express();

// Inicializar base de datos (crear tablas)
require('./db/init');

// Importar rutas
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API Sistema de Ventas',
    version: '1.0',
    endpoints: {
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      clientes: '/api/clientes'
    }
  });
});

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clientes', clientesRoutes);

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: SQLite (ventas.db)`);
  console.log(`\nEndpoints disponibles:`);
  console.log(`  GET    http://localhost:${PORT}/api/productos`);
  console.log(`  POST   http://localhost:${PORT}/api/productos`);
  console.log(`  GET    http://localhost:${PORT}/api/usuarios`);
  console.log(`  POST   http://localhost:${PORT}/api/usuarios`);
  console.log(`  GET    http://localhost:${PORT}/api/clientes`);
  console.log(`  POST   http://localhost:${PORT}/api/clientes\n`);
});