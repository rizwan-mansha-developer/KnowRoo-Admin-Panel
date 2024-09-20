import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
// import DropdownIcon from '../../assets/Icons/DropdownIcon.svg'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
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
        {`${payload[0].value}`}
      </Box>
    );
  }
  return null;
};

const TeacherActivity = ({ teacherActivity }) => {
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
        width: '320px',
        height: '320px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
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
        <Typography variant="h6" gutterBottom fontSize={18} fontWeight={'bold'}>
          Teachers Activity
        </Typography>
      </Box>
      <ResponsiveContainer
        width={'120%'}
        height={250}
        style={{ position: 'absolute', right: '-5px', top: '100px' }}
      >
        <AreaChart data={teacherActivity?.data}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontWeight={'bold'}
            tick={false}
          />
          <YAxis axisLine={false} tickLine={false} tick={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#00A2FF', strokeWidth: 1, strokeDasharray: '4,4' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00A2FF"
            fill="url(#colorUv)"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A2FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00A2FF" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TeacherActivity;
