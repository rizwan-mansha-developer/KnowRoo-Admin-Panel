import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import TimerIcon from '../../assets/CardsIcon/TimerBlue.svg';
import CourseIcon from '../../assets/CardsIcon/courseIcon.svg';
import UnSelectIcon from '../../assets/CardsIcon/unSelectCourse.svg';
import ModalOpen from '../Modal/Modal';
import ViewCourse from '../../pages/Hops/PreviewHops/CoursePreview/Index';

// Character limit constant
const CHARACTER_LIMIT = 18;

/// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || ''; // Return an empty string if text is undefined or null
};

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Styled components
const StyledCard = styled(Card)({
  maxWidth: 350,
});

const CreateCourse = ({ id, heading, color, isHovered }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle card click
  const handleCardClick = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {' '}
      <ModalOpen
        AddContent={<ViewCourse id={id} CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={isModalOpen}
      />
      <StyledCard onClick={handleCardClick} style={{ background: isHovered ? '#fff' : '#F0F1F9' }}>
        <Box display="flex" justifyContent="space-between" px={1} py={1}>
          <CardContent>
            <Typography
              variant="h6"
              style={{ fontWeight: 'bold', marginLeft: '0px', color: color, textAlign: 'center' }}
            >
              {truncateText(capitalizeFirstLetter(heading), CHARACTER_LIMIT)}
            </Typography>
            <img style={{ width: '70px' }} src={isHovered ? CourseIcon : UnSelectIcon} />
          </CardContent>
        </Box>
      </StyledCard>
    </>
  );
};
CreateCourse.propTypes = {
  heading: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default CreateCourse;
