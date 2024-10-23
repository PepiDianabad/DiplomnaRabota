import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate to different routes
  const userId = location.state?.userId; // Get userId from location state
  const [interviews, setInterviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/results/${userId}`);
        console.log(response.data);
        setInterviews(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch interviews.');
        console.error(err);
      }
    };

    if (userId) {
      console.log("Res", userId);
      fetchInterviews();
    }
  }, [userId]);

  // Function to format questions and feedback into multiple lines
  const formatText = (text) => {
    return text.split(',').map((line, index) => (
      <Typography key={index} variant="body2">{line.trim()}</Typography>
    ));
  };

  // // Function to format the createdAt date - purvonachalno beshe taka, ama sled tova iskah da displeivam sled zapetaqta na nov red
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

    // Function to format the createdAt date
    const formatDate = (dateString) => {
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      const date = new Date(dateString);
      
      const formattedDate = date.toLocaleDateString(undefined, dateOptions); // Format the date
      const formattedTime = date.toLocaleTimeString(undefined, timeOptions); // Format the time
  
      return { formattedDate, formattedTime }; // Return both parts
    };


  // Function to navigate to the home page
  const handleHomeRedirect = () => {
    navigate('/', {state: {userId}}); // Redirect to the home page
  };

  return (
    <Container>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        style={{
          fontWeight: 'bold',
          color: '#3f51b5', // Primary color
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle text shadow
          marginBottom: '20px',
        }}
      >
        Your Interviews
      </Typography>
      {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell> {/* Changed header to "Created At" */}
              <TableCell>Type</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.length > 0 ? (
              interviews.map((interview) => {
                const { formattedDate, formattedTime } = formatDate(interview.createdAt); // Get formatted date and time
                return (
                  <TableRow key={interview.id}>
                    <TableCell>
                      <Typography variant="body2">{formattedDate}</Typography> {/* Date on one line */}
                      <Typography variant="body2">{formattedTime}</Typography> {/* Time on another line */}
                    </TableCell>
                    <TableCell>{interview.type}</TableCell>
                    <TableCell>
                      {formatText(interview.questions)}
                    </TableCell>
                    <TableCell>
                      {interview.feedback ? formatText(interview.feedback) : 'No feedback provided'}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No interviews found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Centering the button without using Box */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleHomeRedirect}
        >
          Go to Home
        </Button>
      </div>
    </Container>
  );
};

export default Results;