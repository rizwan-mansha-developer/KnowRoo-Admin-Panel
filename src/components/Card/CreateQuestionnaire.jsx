import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Character limit constant
const CHARACTER_LIMIT = 22;

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

const CountBox = styled(Box)`
  width: 50px;
  height: 50px;
  background-color: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  margin-right: 16px;
`;

const CreateQuestionnaire = ({ id, count, heading, color, isHovered }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    sessionStorage.setItem('questionnaireId', id);
    sessionStorage.setItem('questionnaireName', heading);
    // navigate('/mobs/adventures/leaps/hops/startHops'  ,  { state: { id , Name } });
    navigate('/mobs/adventures/leaps/hops/startHops/questionnaire', { state: { id, heading } });
  };
  return (
    <StyledCard onClick={handleCardClick} style={{ background: isHovered ? '#fff' : '#EBF8F5' }}>
      <Box display="flex" px={1} py={1}>
        <CountBox>{count}</CountBox>
        <CardContent>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', marginLeft: '0px', color: color, textAlign: 'center' }}
          >
            {truncateText(capitalizeFirstLetter(heading), CHARACTER_LIMIT)}
          </Typography>
        </CardContent>
      </Box>
    </StyledCard>
  );
};

CreateQuestionnaire.propTypes = {
  count: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default CreateQuestionnaire;
