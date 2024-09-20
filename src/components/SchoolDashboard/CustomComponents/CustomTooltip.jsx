// CustomTooltip.js
import React from 'react';
import { Tooltip, Typography, Box } from '@mui/material';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Tooltip
        open={true}
        placement="top"
        title={
          <Box
            sx={{
              backgroundColor: '#00A2FF',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '10px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="body2">{`${payload[0].value}`}</Typography>
          </Box>
        }
        arrow
        sx={{
          '& .MuiTooltip-tooltip': {
            bgcolor: '#00A2FF',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        }}
      >
        <Box />
      </Tooltip>
    );
  }
  return null;
};

export default CustomTooltip;
