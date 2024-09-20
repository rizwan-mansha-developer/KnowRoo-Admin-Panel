import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/FormsIcon/CloseIcon.svg';
import { bgcolor } from '@mui/system';

const ModalOpen = ({ Title, AddContent, CloseModal, OpenModal, bgColor }) => {
  return (
    <Modal
      // style={{ backgroundColor: '#000000' }}
      open={OpenModal}
      onClose={CloseModal}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1300,
          width: {
            xs: '90%', // 90% width on extra-small screens
            sm: '80%', // 80% width on small screens
            md: '70%', // 70% width on medium screens and above
          },
          // backgroundColor: bgColor ? bgcolor : '#ffffff',
          height: 'auto',
          maxHeight: '95vh',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: '20px',
          padding: '40px 30px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Typography>{AddContent}</Typography>
      </Box>
    </Modal>
  );
};

// Prop types definition
ModalOpen.propTypes = {
  Title: PropTypes.string, // Add more specific types if these props are needed
  AddContent: PropTypes.node,
  CloseModal: PropTypes.func.isRequired,
  OpenModal: PropTypes.bool.isRequired,
};

export default ModalOpen;
