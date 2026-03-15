const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../auth');
const { generateQuestions } = require('../scenarios');

// Iniciar nueva simulación
router.post('/', verifyToken, async (req, res) => {
  const { teamSize } = req.body;
  const size = teamSize || Math.floor(Math.random() * 4) + 3;
  const questions = generateQuestions(size);
  const questionsJson = JSON.stringify(questions);
  try {
    const [result] = await db.execute(
      'INSERT INTO simulations (user_id, score, team_size, questions) VALUES (?, ?, ?, ?)',
      [req.userId, 0, size, questionsJson]
    );
    res.json({
      simulationId: result.insertId,
      currentQuestionIndex: 0,
      question: questions[0],
      score: 0,
      totalQuestions: questions.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear simulación' });
  }
});

// Enviar respuesta
router.post('/:id/answer', verifyToken, async (req, res) => {
  const simulationId = req.params.id;
  const { answer, questionIndex } = req.body;
  if (!answer || questionIndex === undefined) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {
    const [rows] = await db.execute(
      'SELECT * FROM simulations WHERE id = ? AND user_id = ?',
      [simulationId, req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Simulación no encontrada' });
    }
    const simulation = rows[0];
    let questions = JSON.parse(simulation.questions);
    if (questionIndex >= questions.length) {
      return res.status(400).json({ error: 'Índice de pregunta inválido' });
    }
    const question = questions[questionIndex];
    if (question.userAnswer !== null) {
      return res.status(400).json({ error: 'Pregunta ya respondida' });
    }

    const isCorrect = (answer.toUpperCase() === question.correct);
    let pointsChange = isCorrect ? 10 : -5;
    // Bonus aleatorio (simulado)
    if (isCorrect && Math.random() < 0.3) pointsChange += 5;

    question.userAnswer = answer;
    questions[questionIndex] = question;

    const newScore = simulation.score + pointsChange;
    const isLast = (questionIndex === questions.length - 1);

    await db.execute(
      'UPDATE simulations SET score = ?, questions = ? WHERE id = ?',
      [newScore, JSON.stringify(questions), simulationId]
    );

    if (isLast) {
      const errors = questions.filter(q => q.userAnswer !== q.correct).map(q => q.context.substring(0, 50));
      await db.execute(
        `UPDATE users 
         SET total_score = total_score + ?,
             simulations_count = simulations_count + 1,
             common_errors = JSON_MERGE_PATCH(COALESCE(common_errors, '{}'), ?)
         WHERE id = ?`,
        [newScore, JSON.stringify({ lastErrors: errors }), req.userId]
      );
    }

    const response = {
      isCorrect,
      pointsChange,
      newScore,
      explanation: question.explanation,
      correctAnswer: question.correct
    };
    if (!isLast) {
      response.nextQuestion = questions[questionIndex + 1];
      response.nextQuestionIndex = questionIndex + 1;
    } else {
      response.completed = true;
      response.finalScore = newScore;
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al procesar respuesta' });
  }
});

// Historial del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, score, team_size, date FROM simulations WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

// Detalle de simulación
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM simulations WHERE id = ? AND user_id = ?',
      [req.params.id, req.userId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrada' });
    const sim = rows[0];
    sim.questions = JSON.parse(sim.questions);
    res.json(sim);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener simulación' });
  }
});

module.exports = router;