const express = require('express');
const router = express.Router();
const Interview = require('../models/InterviewModel'); // Import your Interview model

// POST /interviews to create an interview
router.post('/', async (req, res) => {
  const { type, questions, feedback, userId } = req.body; // Destructure the data from req.body

  try {
    const newInterview = await Interview.create({ type, questions, feedback, userId });
    res.status(201).json(newInterview); // Respond with the created interview
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create interview' }); // Handle any errors
  }
});

module.exports = router; // Export the router
