import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Interview = () => {
  // Sample questions for the mock interview
  const questions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What are your strengths and weaknesses?",
  ];

  const sectors = [
    "Web Developer",
    "Engineer",
    "Teacher",
    "DevOps Specialist",
    "Data Scientist",
    "Product Manager",
    "Graphic Designer",
    "Marketing Specialist",
    "System Administrator",
    "UX/UI Designer",
  ];

  const degrees = [
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
    "Expert"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState([]); // Store feedback for results
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(true);
  const [showResultsButton, setShowResultsButton] = useState(false); // Control visibility of results button
  const [selectedSector, setSelectedSector] = useState(''); // State for selected sector
  const [selectedDegree, setSelectedDegree] = useState(''); // State for selected degree
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (answer.trim() === '') {
      alert('Please provide an answer.');
      return;
    }

    // Simulate AI feedback
    const currentFeedback = `Feedback for your answer: "${answer}"`;
    setFeedback(prevFeedback => [
      ...prevFeedback,
      { question: questions[currentQuestion], answer, feedback: currentFeedback }
    ]);

    // Move to the next question if available, otherwise finish the interview
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
    } else {
      // Hide the Finish Interview button and show results button
      setShowNextQuestionButton(false);
      setShowResultsButton(true);
    }
  };

  const location = useLocation();
  const { userId } = location.state || {}; // Access userId from the state

  const handleViewResults = async () => {
    // Prepare the data for the interview
    const interviewData = {
      type: selectedSector + ' ' + selectedDegree, // Include degree in the data sent to the backend
      questions: feedback.map((item) => item.question).join(', '), // Join all questions into one string
      feedback: feedback.map((item) => item.feedback).join(', '), // Join all feedback into one string
      userId: userId, // Replace with the actual user ID from your authentication state
    };

    try {
      // Upload interview data to the backend
      await axios.post('http://localhost:5000/interviews', interviewData);
      // Navigate to the results page
      navigate('/results', { state: { results: feedback, userId: interviewData.userId } }); // when going to result page pass the id too
    } catch (error) {
      console.error('Error submitting interview:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Interview Question {currentQuestion + 1}/{questions.length}
      </Typography>

      {/* Sector Selection Dropdown */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="sector-select-label">Select Sector</InputLabel>
        <Select
          labelId="sector-select-label"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          label="Select Sector"
        >
          {sectors.map((sector, index) => (
            <MenuItem key={index} value={sector}>{sector}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Degree Selection Dropdown */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="degree-select-label">Select Degree</InputLabel>
        <Select
          labelId="degree-select-label"
          value={selectedDegree}
          onChange={(e) => setSelectedDegree(e.target.value)}
          label="Select Degree"
        >
          {degrees.map((degree, index) => (
            <MenuItem key={index} value={degree}>{degree}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        {questions[currentQuestion]}
      </Typography>

      <Box sx={{ margin: '20px 0' }}>
        <TextField
          fullWidth
          label="Your Answer"
          multiline
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          variant="outlined"
        />
      </Box>

      {showNextQuestionButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          sx={{ marginBottom: '20px', width: '100%', padding: '10px' }}
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
        </Button>
      )}

      {showResultsButton && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewResults}
          sx={{ marginBottom: '20px', width: '100%', padding: '10px' }}
        >
          View Results
        </Button>
      )}
      
      {/* Display selected degree */}
      {selectedDegree && (
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Selected Degree: {selectedDegree}
        </Typography>
      )}
    </Container>
  );
};

export default Interview;
