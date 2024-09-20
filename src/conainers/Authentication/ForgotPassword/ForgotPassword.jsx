import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import InputField from '../../../components/InputField/Index';
import { Button, Box, Snackbar, Alert, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext';

const ForgotForm = () => {
  const { ForgotPassword, errorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setEmailError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      const response = await ForgotPassword(email);
      console.log(response.status);

      setSnackbarMessage(response.message);
      setSnackbarSeverity(response.status === 'success' ? 'success' : 'error');
      setSnackbarOpen(true);
      if (response.status === 'success') {
        // Show success message for a few seconds and then navigate to login page
        setTimeout(() => {
          navigate('/');
        }, 3000); // 3 seconds delay
      }
    } catch (error) {
      setSnackbarMessage(error.message || errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('Email is required');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '80%', p: 3 }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            name="email"
            type="email"
            value={email}
            fullWidth
            placeholder="Enter Email Address"
            variant="outlined"
            onChange={handleEmailChange}
            required
            error={Boolean(emailError)}
            helperText={emailError}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            style={{
              fontSize: '20px',
              borderRadius: '10px',
              backgroundColor: '#4caf50',
              color: '#fff',
              fontWeight: 'bold',
              height: '50px',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotForm;
