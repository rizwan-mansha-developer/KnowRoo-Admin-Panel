import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Card, CardContent, Button, Menu, MenuItem } from '@mui/material';
import 'chart.js/auto';
// import DropdownIcon from "../../assets/Icons/DropdownIcon.svg";

const CircularGraph = ({ totalMobs, availableMobs, activeMobs, inactiveMobs }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Calculate the percentage of available mobs
  const availablePercentage = ((availableMobs / totalMobs) * 100) / 3;
  const activePercentage = activeMobs;
  const inactivePercentage = inactiveMobs;
  const unavailablePercentage = 100 - availablePercentage - activePercentage - inactivePercentage;

  const data = {
    labels: ['Active Mobs', 'Inactive Mobs'],
    datasets: [
      {
        data: [
          // availablePercentage,
          activePercentage,
          inactivePercentage,
          // unavailablePercentage,
        ],
        backgroundColor: ['#4CAF50', '#FFA500', '#03A9F4', 'transparent'],
        hoverBackgroundColor: ['#4CAF50', '#FFA500', '#03A9F4', 'transparent'],
        borderColor: ['#4CAF50', '#FFA500', '#03A9F4', 'transparent'],
        borderRadius: 10, // Different border radius for each segment
        cutout: '70%',
        hoverOffset: 4,
        borderWidth: [9, 7, 1, 0], // Different widths for each segment
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw; // This will use the raw data (activeMobs or inactiveMobs)
            return `${label}: ${value}`;
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
        width: '320px',
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
            Mobs Activity
          </Typography>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'row-reverse'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={3}
        >
          <Box sx={{ position: 'relative', height: 172, width: 160, mx: 'auto' }}>
            <svg
              viewBox="0 0 42 42"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '140px',
                height: '140px',
                zIndex: 0,
              }}
            >
              <circle cx="21" cy="21" r="20" stroke="#d3d3d3" strokeWidth="2" fill="none" />
            </svg>
            <Doughnut data={data} options={options} style={{ zIndex: 1, position: 'relative' }} />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              {/* <Typography variant="h6" fontWeight="bold">
                {availablePercentage.toFixed(2) * 3}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                of the school
              </Typography> */}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '65%',
              marginTop: '10px',
              gap: 2,
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
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body2" sx={{ color: '#787486', fontSize: '10px' }}>
                  Active Mobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#4CAF50', fontSize: '16px', fontWeight: 'bold' }}
                >
                  {totalMobs}
                </Typography>
              </Box>
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
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body2" sx={{ color: '#787486', fontSize: '10px' }}>
                  InActive Mobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#FFA500', fontSize: '16px', fontWeight: 'bold' }}
                >
                  {inactiveMobs}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: '#03A9F4',
                  borderRadius: '50%',
                  marginRight: '5px',
                  marginTop: '5px',
                }}
              />
              <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body2" sx={{ color: '#787486', fontSize: '10px' }}>
                  Total Mobs
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#03A9F4', fontSize: '16px', fontWeight: 'bold' }}
                >
                  {totalMobs}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CircularGraph;
