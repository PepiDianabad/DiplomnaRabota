const express = require('express');
const sequelize = require('./config/db');

const User = require('./models/UserModel');  // Import your models here
const Interview = require('./models/InterviewModel');

const authRoutes = require('./routes/auth');  // Import auth routes
const interviewRoutes = require('./routes/interview'); // Import the interviews routes4
const resultsRoutes = require('./routes/results');



const app = express();
app.use(express.json());

const cors = require('cors');

// Use CORS to allow requests from your React app
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from your React app's URL
  credentials: true // If you want to allow cookies, authentication headers, etc.
}));

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Use the authentication routes for login functionality
app.use('/auth', authRoutes);
app.use('/interviews', interviewRoutes);
app.use('/results', resultsRoutes);

// Sync the models and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
