const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'workouts.sqlite'
});

app.use(cors());
app.use(express.json());

const Workout = sequelize.define('Workout', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync();

app.get('/workouts', async (req, res) => {
  const workouts = await Workout.findAll();
  res.json(workouts);
});

app.post('/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.json(workout);
});

app.put('/workouts/:id', async (req, res) => {
  const { id } = req.params;
  await Workout.update(req.body, { where: { id } });
  const updatedWorkout = await Workout.findByPk(id);
  res.json(updatedWorkout);
});

app.delete('/workouts/:id', async (req, res) => {
  await Workout.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
