import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Card, Typography } from '@mui/material';
import DecGraph from '../../assets/CardsIcon/SuccessGraph.svg';
import IncGraph from '../../assets/CardsIcon/errorGraph.svg';

// Character limit constant
const CHARACTER_LIMIT = 80;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || ''; // Ensure it returns an empty string if text is undefined or null
};

const StyledCard = styled(Card)`
  width: auto;
  // border: 1px solid #F4F4F8;
  position: relative;
  &:hover .menu-icon {
    display: block;
  }
`;

const DashbaordHeaderCard = ({ id, score, name, changevalue }) => {
  const graphImage = changevalue >= 0 ? DecGraph : IncGraph;
  return (
    <StyledCard style={{ backgroundColor: '#f8f8fd', border: '1px solid #F4F4F8', padding: '8px' }}>
      <Typography variant="body1" fontSize={''} fontWeight={'bold'}>
        {' '}
        Total {name}
      </Typography>
      <Typography variant="h5" fontWeight={'700'}>
        {score}
      </Typography>
      <Typography variant="body1" fontSize={'10px'}>
        <img src={graphImage} />{' '}
        <span
          style={{
            color: changevalue >= 0 ? '#22CC29' : '#CC2222',
            marginRight: '10px',
            fontSize: '15px',
          }}
        >
          +{changevalue}%
        </span>{' '}
        vs Last Month
      </Typography>
    </StyledCard>
  );
};

export default DashbaordHeaderCard;
