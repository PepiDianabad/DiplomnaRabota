// models/InterviewModel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel'); // Import the User model


class Interview extends Model {}

Interview.init({
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Assumes the users table is named 'Users'
      key: 'id',
    },
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Interview',
});

// Define the association back to User (optional)
Interview.belongsTo(User, {
  foreignKey: 'userId', // This should match the userId in the User model
  onDelete: 'CASCADE', // Optional: specify what happens when a user is deleted
});

module.exports = Interview;
