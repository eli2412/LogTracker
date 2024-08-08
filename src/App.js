import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/workouts')
      .then(response => setWorkouts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addWorkout = (workout) => {
    axios.post('http://localhost:3001/workouts', workout)
      .then(response => setWorkouts([...workouts, response.data]))
      .catch(error => console.error(error));
  };

  const editWorkout = (updatedWorkout) => {
    axios.put(`http://localhost:3001/workouts/${updatedWorkout.id}`, updatedWorkout)
      .then(response => {
        setWorkouts(workouts.map(workout => (workout.id === updatedWorkout.id ? response.data : workout)));
        setWorkoutToEdit(null);
      })
      .catch(error => console.error(error));
  };

  const deleteWorkout = (id) => {
    axios.delete(`http://localhost:3001/workouts/${id}`)
      .then(() => setWorkouts(workouts.filter(workout => workout.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <div className="header">
        <Typography variant="h4" gutterBottom>Workout Tracker</Typography>
      </div>
      <div className="form-container">
        <WorkoutForm addWorkout={addWorkout} editWorkout={editWorkout} workoutToEdit={workoutToEdit} />
      </div>
      <div className="list-container">
        <WorkoutList workouts={workouts} deleteWorkout={deleteWorkout} setWorkoutToEdit={setWorkoutToEdit} />
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Workout Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
