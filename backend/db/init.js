const db = require('./connection');

// Crear todas las tablas
db.serialize(() => {
  
  // Tabla productos
  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla productos:', err.message);
    } else {
      console.log('✓ Tabla productos creada/verificada');
    }
  });

  // Tabla usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla usuarios:', err.message);
    } else {
      console.log('✓ Tabla usuarios creada/verificada');
    }
  });

  // Tabla clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      documento_identidad TEXT UNIQUE NOT NULL,
      direccion TEXT,
      telefono TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla clientes:', err.message);
    } else {
      console.log('✓ Tabla clientes creada/verificada');
    }
  });

  // Tabla ventas
  db.run(`
    CREATE TABLE IF NOT EXISTS ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
      total REAL NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla ventas:', err.message);
    } else {
      console.log('✓ Tabla ventas creada/verificada');
    }
  });

  // Tabla detalle_ventas
  db.run(`
    CREATE TABLE IF NOT EXISTS detalle_ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venta_id INTEGER NOT NULL,
      producto_id INTEGER NOT NULL,
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (venta_id) REFERENCES ventas(id),
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error al crear tabla detalle_ventas:', err.message);
    } else {
      console.log('✓ Tabla detalle_ventas creada/verificada');
    }
  });

});

module.exports = db;