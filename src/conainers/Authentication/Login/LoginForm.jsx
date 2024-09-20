import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/Index';
import { Button, Box, Link, Snackbar, Alert, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const { login, errorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch role_id from cookies
  const role = Cookies.get('role_id');

  const validateEmail = (email) => {
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return emailPattern.test(email);
    return true;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate fields
    let valid = true;

    if (!email) {
      setEmailError('Email & Username required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    // If any error exists, show a snackbar and do not proceed
    if (!valid) {
      setSnackbarMessage('Please fix the errors in the form');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Set loading state to true
    setLoading(true);

    // Proceed with API call only if validation is successful
    try {
      await login(email, password);
      // Ensure the role_id is refreshed from cookies after login
      const updatedRole = Cookies.get('role_id');
      // console.log('Updated Role ID from cookies:', updatedRole);

      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');

      if (parseInt(updatedRole, 10) === 1) {
        navigate('/adminDashbaord');
      } else if (parseInt(updatedRole, 10) === 2) {
        navigate('/dashboard');
      } else {
        navigate('/mobs');
      }
    } catch (error) {
      setSnackbarMessage(
        errorMessage || error.response.data.message || 'Login failed. Please try again.'
      );
      setSnackbarSeverity('error');
    } finally {
      // Set loading state to false
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  // Handle input change and validate in real-time
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value) {
      setEmailError('Email & Username required');
    } else if (!validateEmail(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
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
            placeholder="Enter Email / Username"
            variant="outlined"
            onChange={handleEmailChange}
            required
            error={Boolean(emailError)}
            helperText={emailError}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            showPasswordToggle={true}
            fullWidth
            placeholder="Enter Password"
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" color="#4CAF50">
            <Link href="/forgot-password" variant="body2" style={{ textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Box>
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
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} /> : 'Log In'} {/* Show loader when loading */}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
