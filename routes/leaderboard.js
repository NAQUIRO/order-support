const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../auth');

// Obtener top 10 y posición del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const [topRows] = await db.execute(
      `SELECT id, name, total_score, simulations_count,
              ROUND(total_score / NULLIF(simulations_count, 0), 2) AS avg_score
       FROM users
       WHERE simulations_count > 0
       ORDER BY total_score DESC
       LIMIT 10`
    );

    const [allRows] = await db.execute(
      `SELECT id, total_score,
              RANK() OVER (ORDER BY total_score DESC) as position
       FROM users
       WHERE simulations_count > 0`
    );
    const userRank = allRows.find(u => u.id === req.userId)?.position || null;

    res.json({
      top: topRows,
      userPosition: userRank
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener ranking' });
  }
});

module.exports = router;