// Mock the formidable package
jest.mock('formidable');

// Import dependencies
const request = require('supertest');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// Initialize the app and database
const app = express();
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:'
});

app.use(cors());
app.use(express.json());

// Define the Workout model
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

// Define the routes
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

// Define the test suite
describe('Workout API', () => {
  it('should return all workouts', async () => {
    const response = await request(app).get('/workouts');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should create a new workout', async () => {
    const newWorkout = {
      name: 'Test Workout',
      date: '2023-08-01',
      duration: 30,
      type: 'Cardio'
    };

    const response = await request(app)
      .post('/workouts')
      .send(newWorkout);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newWorkout.name);
  });

  it('should update a workout', async () => {
    const workout = await Workout.create({
      name: 'Test Workout',
      date: '2023-08-01',
      duration: 30,
      type: 'Cardio'
    });

    const updatedData = {
      name: 'Updated Workout',
      date: '2023-08-02',
      duration: 45,
      type: 'Strength'
    };

    const response = await request(app)
      .put(`/workouts/${workout.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete a workout', async () => {
    const workout = await Workout.create({
      name: 'Test Workout',
      date: '2023-08-01',
      duration: 30,
      type: 'Cardio'
    });

    const response = await request(app).delete(`/workouts/${workout.id}`);
    expect(response.status).toBe(204);
  });
});
