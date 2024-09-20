import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import DropdownIcon from '../../assets/Icons/DropdownIcon.svg';

const data = [
  { name: 'M', points: 60 },
  { name: 'T', points: 80 },
  { name: 'W', points: 20 },
  { name: 'T', points: 92 },
  { name: 'F', points: 60 },
  { name: 'S', points: 50 },
  { name: 'S', points: 40 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '4px',
          boxShadow: '0 0 8px rgba(0,0,0,0.2)',
        }}
      >
        <Typography>{`${payload[0].value} Points`}</Typography>
      </Box>
    );
  }

  return null;
};

const PerformanceBarGraph = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: '400px',
        height: '180px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom fontSize={14} fontWeight={'bold'}>
          Average Performance of Highest Mobs
        </Typography>
        <Button
          onClick={handleMenuOpen}
          endIcon={<img src={DropdownIcon}></img>}
          sx={{
            borderRadius: 3,
            backgroundColor: '#E9ECF1',
            color: '#787486',
            boxShadow: 'none',
            width: '110px',
            fontSize: 12,
          }}
        >
          this week
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        </Menu>
      </Box>
      <ResponsiveContainer
        width={'100%'}
        height={140}
        style={{ position: 'absolute', right: '30px', top: '50px' }}
      >
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontWeight={'bold'}
          />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} />
          <Bar
            dataKey="points"
            fill="#E9ECF1"
            radius={[7, 7, 7, 7]}
            onMouseEnter={(data, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === hoveredIndex ? '#4CAF50' : '#E9ECF1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PerformanceBarGraph;
