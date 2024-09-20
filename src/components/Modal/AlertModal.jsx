import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogContent, DialogActions, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '../../assets/CardsIcon/deleteAlert.svg';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiPaper-root': {
    borderRadius: '16px', // Custom border radius
    maxWidth: '90%', // Custom maximum width to be responsive
    width: '80%', // Ensure the dialog takes the full width within its maxWidth
    height: 'auto', // Allow height to adjust based on content
    maxHeight: '80vh', // Set a maximum height
    [theme.breakpoints.up('md')]: {
      width: '30%', // Adjust width for desktop screens
    },
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '20px', // Custom padding
  textAlign: 'center', // Center text within content
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'center', // Center buttons horizontally
  padding: '20px', // Add padding if needed
}));

const AlertModal = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  loading,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogContent>
        <Grid container justifyContent="center">
          <img src={DeleteIcon} alt="Delete Icon" />
        </Grid>
        {title ? (
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
        ) : (
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {'Are you sure?'}
          </Typography>
        )}

        <Typography variant="body1">{message}</Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} style={{ color: '#616161', background: '#7878801F' }}>
          {cancelText || 'Cancel'}
        </Button>
        <Button
          onClick={onConfirm}
          style={{ color: '#fff', background: '#fe1332' }}
          disabled={loading}
        >
          {loading ? 'Processing...' : confirmText || 'Confirm'}
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
};

export default AlertModal;
