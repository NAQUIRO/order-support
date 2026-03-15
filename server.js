require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const simulationsRouter = require('./routes/simulations');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/simulations', simulationsRouter);
app.use('/api/leaderboard', leaderboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});