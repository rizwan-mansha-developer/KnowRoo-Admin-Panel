import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/InputField/Index';
import { Button, Box, Snackbar, Alert, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../AuthContext';
import CustomSnackbar from '../../../components/Snackbar/CustomSnackbar';

const ChangeForm = () => {
  const { ForgotPassword, errorMessage } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate fields
    let valid = true;

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) return;

    // Set loading state to true
    setLoading(true);

    try {
      const response = await ForgotPassword(password); // Send password to API
      setSnackbarMessage(response.message);
      setSnackbarSeverity(response.status === 'success' ? 'success' : 'error');
      setSnackbarOpen(true);
      if (response.status === 'success') {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setSnackbarMessage(error.message || errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);

    if (!value) {
      setConfirmPasswordError('Confirm password is required');
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
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
          <InputField
            name="confirmPassword"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            type={showPassword ? 'text' : 'password'}
            showPasswordToggle={true}
            fullWidth
            placeholder="Confirm Password"
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
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

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />

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

export default ChangeForm;
