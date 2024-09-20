import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import TimerIcon from '../../assets/CardsIcon/TimerIcon.svg';
import { useNavigate } from 'react-router-dom';

// Character limit constant
const CHARACTER_LIMIT = 18;

// Utility function to truncate text
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
const StyledCard = styled(Card)`
  width: 100%;
  @media (min-width: 600px) {
    max-width: 285px;
  }
  @media (min-width: 700px) {
    max-width: 307px;
  }
  @media (min-width: 800px) {
    max-width: 365px;
  }
  @media (min-width: 850px) {
    max-width: 380px;
  }
  @media (min-width: 900px) {
    max-width: 415px;
  }
  @media (min-width: 960px) {
    max-width: 315px;
  }
  @media (min-width: 1000px) {
    max-width: 345px;
  }
  //125%
  @media (min-width: 1050px) {
    max-width: 392px;
  }
  @media (min-width: 1100px) {
    max-width: 385px;
  }
  @media (min-width: 1150px) {
    max-width: 415px;
  }
  //110%
  @media (min-width: 1200px) {
    max-width: 305px;
  }
  @media (min-width: 1250px) {
    max-width: 305px;
  }
  @media (min-width: 1300px) {
    max-width: 325px;
  }

  //100%
  @media (min-width: 1350px) {
    max-width: 397px;
  }

  @media (min-width: 1400px) {
    max-width: 352px;
  }
  @media (min-width: 1450px) {
    max-width: 362px;
  }
  @media (min-width: 1500px) {
    max-width: 390px;
  }
  //90%
  @media (min-width: 1500px) {
    max-width: 395px;
  }
  @media (min-width: 1600px) {
    max-width: 337px;
  }
  //80%
  @media (min-width: 1700px) {
    max-width: 337px;
  }
  //75%
  @media (min-width: 1800px) {
    max-width: 365px;
  }
  @media (min-width: 1900px) {
    max-width: 420px;
  }
`;

const CountBox = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: #ffa500;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  margin-right: 16px;
`;

const CreateQuiz = ({ id, question, count, heading, color, duration, isHovered }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    sessionStorage.setItem('quizId', id);
    sessionStorage.setItem('quizName', heading);
    // navigate('/mobs/adventures/leaps/hops/startHops'  ,  { state: { id , Name } });
    navigate('/mobs/adventures/leaps/hops/startHops/quiz', { state: { id, heading } });
  };

  return (
    <StyledCard style={{ background: isHovered ? '#fff' : '#FFEDDF' }} onClick={handleCardClick}>
      <Box display="flex" justifyContent="space-between" px={1} py={1}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <CountBox>{count}</CountBox>
            <Box>
              <Typography
                variant="h6"
                style={{ fontWeight: 'bold', marginLeft: '0px', color: color, textAlign: 'center' }}
              >
                {truncateText(capitalizeFirstLetter(heading), CHARACTER_LIMIT)}
              </Typography>
              <Typography
                px={1}
                style={{
                  background: isHovered ? '#FFF8EA' : '#fff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  width: '90px',
                  color: '#ffa500',
                  fontWeight: 'bold',
                }}
              >
                {question} Question
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Box>
          <img style={{ marginTop: '-10px', marginLeft: '30px' }} src={TimerIcon} />
          <Typography style={{ color: '#616161', fontSize: '12px', fontWeight: 'bold' }}>
            {duration} Sec
          </Typography>
        </Box>
      </Box>
    </StyledCard>
  );
};
CreateQuiz.propTypes = {
  count: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  duration: PropTypes.string,
};
export default CreateQuiz;
