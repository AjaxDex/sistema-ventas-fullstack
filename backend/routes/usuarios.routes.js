const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// ➕ Crear usuario
router.post('/', (req, res) => {
  const { nombre, email, password } = req.body;
  db.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, nombre, email });
    }
  );
});

// 🔍 Obtener todos
router.get('/', (req, res) => {
  db.query('SELECT id, nombre, email FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✏️ Actualizar
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  db.query(
    'UPDATE usuarios SET nombre=?, email=?, password=? WHERE id=?',
    [nombre, email, password, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Usuario actualizado' });
    }
  );
});

// ❌ Eliminar
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario eliminado' });
  });
});

module.exports = router;
