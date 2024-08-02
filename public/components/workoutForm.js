import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const WorkoutForm = ({ addWorkout }) => {
  const [workout, setWorkout] = useState({
    name: '',
    date: '',
    duration: '',
    type: ''
  });

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(workout);
    setWorkout({ name: '', date: '', duration: '', type: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Workout Name"
        name="name"
        value={workout.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={workout.date}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Duration (minutes)"
        name="duration"
        type="number"
        value={workout.duration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        value={workout.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Add Workout</Button>
    </Box>
  );
};

export default WorkoutForm;
