const express = require('express');
const router = express.Router();
const db = require('../db');
const { generateToken, verifyToken } = require('../auth');

// Registro (solo nombre)
router.post('/register', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  try {
    // Verificar si el nombre ya existe
    const [existing] = await db.execute('SELECT id FROM users WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El nombre ya está en uso' });
    }
    // Insertar nuevo usuario (email y password_hash se omiten, quedarán NULL si las columnas lo permiten)
    const [result] = await db.execute(
      'INSERT INTO users (name) VALUES (?)',
      [name]
    );
    const token = generateToken(result.insertId);
    res.status(201).json({ token, userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login (solo nombre)
router.post('/login', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    const user = rows[0];
    const token = generateToken(user.id);
    res.json({ token, userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Obtener perfil (requiere token)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, name, total_score, simulations_count, common_errors FROM users WHERE id = ?',
      [req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;