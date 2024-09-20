import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styled, useMediaQuery } from '@mui/system';
import PropTypes from 'prop-types';
// Styled component for custom button
const CustomButton = styled(Button)(
  ({ theme, isHovered, backgroundColor, boxShadowColor, IsMobile }) => ({
    fontSize: '15px',
    fontWeight: 'bold',
    height: '50px',
    width: IsMobile ? '70%' : '40%',
    margin: IsMobile ? ' 3% 15%' : ' 3% 30%',
    borderRadius: '10px',
    color: '#fff',
    whiteSpace: 'nowrap',
    backgroundColor: backgroundColor,
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: isHovered ? `0 4px ${boxShadowColor || '#D46F1E'}` : 'none',
    marginTop: '6%',
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
  })
);

// SubmitButton component
const SubmitButton = ({ title, icon, onClick, backgroundColor, boxShadowColor, loading }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <CustomButton
      onClick={onClick}
      isHovered={isHovered}
      type="submit"
      disabled={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      backgroundColor={backgroundColor}
      boxShadowColor={boxShadowColor}
      startIcon={icon && <img src={icon} alt="icon" />}
      IsMobile={IsMobile}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : title}
    </CustomButton>
  );
};
SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  boxShadowColor: PropTypes.string,
};

export default SubmitButton;
