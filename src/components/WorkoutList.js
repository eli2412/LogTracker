import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const WorkoutList = ({ workouts, deleteWorkout, setWorkoutToEdit }) => {
  return (
    <List>
      {workouts.map((workout) => (
        <ListItem key={workout.id} secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={() => setWorkoutToEdit(workout)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteWorkout(workout.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        }>
          <ListItemText primary={workout.name} secondary={`Date: ${workout.date}, Duration: ${workout.duration} min, Type: ${workout.type}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default WorkoutList;
