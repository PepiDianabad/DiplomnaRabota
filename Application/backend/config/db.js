const { Sequelize } = require('sequelize');

// Set the PostgreSQL connection details
const sequelize = new Sequelize('interview_prep_db', 'postgres', 'password', {
  host: 'localhost',  // This 'db' is the service name in Docker Compose, acting as the hostname
  dialect: 'postgres',
  port: 5432,  // PostgreSQL default port
  logging: false, // Set to true if you want to see the SQL queries being executed
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
