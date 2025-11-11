const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Obtener todos los productos
router.get('/', (req, res) => {
  db.all('SELECT * FROM productos', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(row);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { nombre, precio, stock } = req.body;
  
  db.run(
    'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
    [nombre, precio, stock],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        nombre,
        precio,
        stock
      });
    }
  );
});

// Actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  
  db.run(
    'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
    [nombre, precio, stock, id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
      res.json({ mensaje: 'Producto actualizado' });
    }
  );
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM productos WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  });
});

module.exports = router;