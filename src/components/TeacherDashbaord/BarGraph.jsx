import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Box, Typography, Tabs, Tab, Button, Menu, MenuItem } from '@mui/material';
// import DropdownIcon from '../../assets/Icons/DropdownIcon.svg';

const data1 = [
  { name: 'Mon', points: 60, bonus: 20 },
  { name: 'Tue', points: 80, bonus: 40 },
  { name: 'Wed', points: 20, bonus: 50 },
  { name: 'Thu', points: 92, bonus: 63 },
  { name: 'Fri', points: 60, bonus: 30 },
  { name: 'Sat', points: 50, bonus: 40 },
  { name: 'Sun', points: 70, bonus: 45 },
];

const data2 = [
  { name: 'Mon', points: 30, bonus: 10 },
  { name: 'Tue', points: 50, bonus: 20 },
  { name: 'Wed', points: 10, bonus: 25 },
  { name: 'Thu', points: 46, bonus: 31 },
  { name: 'Fri', points: 30, bonus: 15 },
  { name: 'Sat', points: 25, bonus: 20 },
  { name: 'Sun', points: 35, bonus: 22 },
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
        <Typography>{`${payload[0].value} Points & ${payload[1].value} bonuses`}</Typography>
      </Box>
    );
  }

  return null;
};

const DoubleBarGraph = ({ AdvPercentage, LeapPercentage }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorElMob, setAnchorElMob] = useState(null);
  const [anchorElWeek, setAnchorElWeek] = useState(null);
  const [percentage, setPercentgae] = useState(AdvPercentage);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setPercentgae(newValue === 0 ? AdvPercentage : LeapPercentage);
    console.log(newValue);
  };

  const handleMobOpen = (event) => {
    setAnchorElMob(event.currentTarget);
  };

  const handleMobClose = () => {
    setAnchorElMob(null);
  };

  const handleWeekOpen = (event) => {
    setAnchorElWeek(event.currentTarget);
  };

  const handleWeekClose = () => {
    setAnchorElWeek(null);
  };

  const currentData = selectedTab === 0 ? data1 : data2;

  return (
    <Box
      sx={{
        width: '1000px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
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
        <Box display={'flex'} gap={1}>
          <Box></Box>
          <Box></Box>
        </Box>
      </Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ minHeight: '20px' }}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#FFA500',
          },
        }}
      >
        <Tab
          label="Adventures"
          sx={{
            padding: '5px',
            minHeight: '20px',
            color: selectedTab === 0 ? '#FFA500 !important' : '#878787',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        />
        <Tab
          label="Leaps"
          sx={{
            padding: '5px',
            minHeight: '20px',
            color: selectedTab === 1 ? '#FFA500 !important' : '#878787',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}
        />
      </Tabs>
      <Box display={'flex'} gap={2} alignItems={'center'} marginLeft={7}>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          <Typography variant="h1" fontSize={46} marginTop={2} fontWeight={'bold'}>
            {`${percentage}%`}
          </Typography>
          <Typography variant="body2" fontSize={12} marginTop={1} color={'#878787'}>
            Overall Performance
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant="body2" fontSize={12} marginTop={1} color={'#878787'}>
            Latest Update:
          </Typography>
          <Typography variant="body2" fontSize={12} marginTop={1}>
            Fri, August 20
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={1} marginTop={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#03A9F4',
                borderRadius: '50%',
                marginRight: '5px',
              }}
            />
            <Typography variant="body2" sx={{ color: '#787486', fontSize: '12px' }}>
              Active
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#E9ECF1',
                borderRadius: '50%',
                marginRight: '5px',
              }}
            />
            <Typography variant="body2" sx={{ color: '#787486', fontSize: '12px' }}>
              Inactive
            </Typography>
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart
          data={currentData}
          barCategoryGap="15%"
          margin={{ top: 20, right: 40, bottom: 40, left: 40 }}
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={20} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickCount={6}
            orientation="right"
          />
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} />
          <Bar dataKey="points" fill="#E9ECF1" radius={[10, 10, 10, 10]} />
          <Bar dataKey="bonus" fill="#03A9F4" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DoubleBarGraph;
