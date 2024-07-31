const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Workout = sequelize.define("workouts", {
    name: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    date: Sequelize.DATEONLY,
  });

  module.exports = {
    db: sequelize,
    Workout
  };