import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity} // Dynamically set severity
        sx={{ width: '100%' }} // Optional: Make it full width
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
