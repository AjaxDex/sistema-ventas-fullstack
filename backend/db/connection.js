const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear conexión a la base de datos SQLite
const db = new sqlite3.Database(path.join(__dirname, 'ventas.db'), (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('✓ Conectado a SQLite (ventas.db)');
  }
});

module.exports = db;