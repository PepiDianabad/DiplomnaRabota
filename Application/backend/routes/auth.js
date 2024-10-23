const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs'); // To hash and compare passwords

// POST /login route to validate username and password
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    
    // If user doesn't exist, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return success response (You might want to return a JWT token here)
    res.json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /signup route to create a new user
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username, 
      password: hashedPassword, // Store the hashed password
    });

    //res.json({ message: 'Login successful', userId: user.id });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
