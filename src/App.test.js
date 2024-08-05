import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Workout Tracker header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Workout Tracker/i);
  expect(linkElement).toBeInTheDocument();
});
