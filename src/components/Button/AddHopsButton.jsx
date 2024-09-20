import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

// Styled component for custom button
const CustomButton = styled(Button)(({ theme, isHovered, backgroundColor, boxShadowColor }) => ({
  fontSize: '15px',
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  height: '50px',
  width: '100%', // Default to 100% width
  borderRadius: '10px',
  color: '#fff',
  backgroundColor: backgroundColor,
  transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: isHovered ? `0 4px ${boxShadowColor || '#D46F1E'}` : 'none',
  // marginTop: '16px',
  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: backgroundColor || '#FFA500',
    transform: 'translateY(-2px)',
    boxShadow: `0 4px ${boxShadowColor || '#D46F1E'}`,
  },
  '& img': {
    marginLeft: '12px',
  },
  // Responsive width breakpoints
  '@media (min-width: 600px)': {
    maxWidth: '285px',
  },
  '@media (min-width: 700px)': {
    maxWidth: '307px',
  },
  '@media (min-width: 800px)': {
    maxWidth: '365px',
  },
  '@media (min-width: 850px)': {
    maxWidth: '380px',
  },
  '@media (min-width: 900px)': {
    maxWidth: '415px',
  },
  '@media (min-width: 960px)': {
    maxWidth: '315px',
  },
  '@media (min-width: 1000px)': {
    maxWidth: '345px',
  },
  '@media (min-width: 1050px)': {
    maxWidth: '392px',
  },
  '@media (min-width: 1100px)': {
    maxWidth: '385px',
  },
  '@media (min-width: 1150px)': {
    maxWidth: '415px',
  },
  '@media (min-width: 1200px)': {
    maxWidth: '305px',
  },
  '@media (min-width: 1250px)': {
    maxWidth: '305px',
  },
  '@media (min-width: 1300px)': {
    maxWidth: '325px',
  },
  '@media (min-width: 1350px)': {
    maxWidth: '347px',
  },
  '@media (min-width: 1400px)': {
    maxWidth: '352px',
  },
  '@media (min-width: 1450px)': {
    maxWidth: '362px',
  },
  '@media (min-width: 1500px)': {
    maxWidth: '395px',
  },
  '@media (min-width: 1600px)': {
    maxWidth: '337px',
  },
  '@media (min-width: 1700px)': {
    maxWidth: '337px',
  },
  '@media (min-width: 1800px)': {
    maxWidth: '365px',
  },
  '@media (min-width: 1900px)': {
    maxWidth: '420px',
  },
}));

// HopsButton component
const HopsButton = ({ title, icon, onClick, backgroundColor, boxShadowColor }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <CustomButton
      onClick={onClick}
      isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      backgroundColor={backgroundColor}
      boxShadowColor={boxShadowColor}
    >
      {title}
      {icon && <img src={icon} alt="icon" />}
    </CustomButton>
  );
};

HopsButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  boxShadowColor: PropTypes.string,
};

export default HopsButton;
