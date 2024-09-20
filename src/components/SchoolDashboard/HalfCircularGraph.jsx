import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Card, CardContent, Button, Menu, MenuItem } from '@mui/material';
import 'chart.js/auto';
// import DropdownIcon from "../../assets/Icons/DropdownIcon.svg";

const HalfCircularGraph = ({ ActiveAdventure, InActiveAdventure }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Calculate the percentage of each segment for the half-circle
  const activePercentage = ActiveAdventure;
  const inactivePercentage = InActiveAdventure;
  const remainingPercentage = 50 - activePercentage - inactivePercentage;

  const data = {
    labels: ['Active Adventures', 'Inactive Adventures', 'Empty Space'],
    datasets: [
      {
        data: [activePercentage, inactivePercentage],
        backgroundColor: ['#4CAF50', '#FFA500', 'transparent'],
        hoverBackgroundColor: ['#4CAF50', '#FFA500', 'transparent'],
        borderColor: ['#4CAF50', '#FFA500', 'transparent'],
        borderRadius: 7, // Different border radius for each segment
        cutout: '70%',
        hoverOffset: 4, // Different widths for each segment
      },
    ],
  };

  const options = {
    rotation: -90, // Start at 270 degrees
    circumference: 180, // Half-circle
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataIndex === 0) {
              return `Active Adventures: ${ActiveAdventure}%`;
            } else if (context.dataIndex === 1) {
              return `Inactive Adventures: ${InActiveAdventure}%`;
            }
            return null;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        position: 'relative',
        height: '300px',
      }}
    >
      <CardContent>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom fontSize={16} fontWeight={'bold'}>
            Adventures Activity
          </Typography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={3}
        >
          <Box sx={{ position: 'relative', height: 100, width: 190, mx: 'auto' }}>
            <svg
              viewBox="0 0 42 42"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: '90%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '160px',
                height: '160px',
                zIndex: 0,
              }}
            >
              <path
                d="M 1,21 A 20,20 0 0 1 41,21"
                fill="none"
                stroke="#d3d3d3"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <Doughnut data={data} options={options} style={{ zIndex: 1, position: 'relative' }} />
            <Box
              sx={{
                position: 'absolute',
                top: '75%',
                left: '53%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                100%
              </Typography>
            </Box>
          </Box>
          <Box position={'absolute'} bottom={'60px'}>
            <Typography variant="body2" fontSize={13} color={'#C4C4C4'}>
              "Overall performance regarding Adventures"
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '10px',
              gap: 4,
              position: 'absolute',
              bottom: '12px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                  marginRight: '5px',
                  marginTop: '5px',
                }}
              />

              <Typography variant="body2" sx={{ color: '#787486', fontSize: '10px' }}>
                Active Adventures
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#FFA500',
                  borderRadius: '50%',
                  marginRight: '5px',
                  marginTop: '5px',
                }}
              />

              <Typography variant="body2" sx={{ color: '#787486', fontSize: '10px' }}>
                InActive Adventures
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HalfCircularGraph;
