const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Helper: Promisificar consultas SQLite
function queryDB(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getDB(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function runDB(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await queryDB('SELECT * FROM productos');
    res.json({ total: productos.length, data: productos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await getDB('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, precio, stock } = req.body;

  if (!nombre || precio == null || stock == null) {
    return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
  }

  try {
    const result = await runDB(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock]
    );

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: { id: result.lastID, nombre, precio, stock }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  try {
    const result = await runDB(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, precio, stock, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const result = await runDB('DELETE FROM productos WHERE id = ?', [req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
