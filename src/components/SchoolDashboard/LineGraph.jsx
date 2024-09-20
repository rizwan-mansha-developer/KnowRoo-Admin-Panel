import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { name: '0', points: 20 },
  { name: '10', points: 50 },
  { name: '20', points: 30 },
  { name: '30', points: 70 },
  { name: '40', points: 40 },
  { name: '50', points: 60 },
  { name: '60', points: 80 },
];

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
        {`${payload[0].value}%`}
      </Box>
    );
  }
  return null;
};

const LineGraph = ({ leapActivity }) => {
  const currentMonth = new Date().getMonth() + 1; // Get the current month index (0 = January, 11 = December)
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Get the previous month index

  return (
    <Box
      sx={{
        width: '300px',
        height: '320px',
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom fontSize={14} fontWeight={'bold'}>
        Leaps Activity
      </Typography>
      <ResponsiveContainer
        width={'100%'}
        height={250}
        style={{ position: 'absolute', right: '30px', top: '50px' }}
      >
        <LineChart data={leapActivity?.data}>
          <CartesianGrid horizontal vertical={false} stroke="#E0E0E0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontWeight={'bold'}
            tick={false}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={({ payload, x, y, width, height }) => null}
            domain={[0, 100]}
            tickCount={6}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#00A2FF',
              strokeWidth: 1,
              strokeDasharray: '4,4',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#35C759"
            strokeWidth={3}
            activeDot={{
              r: 8,
              fill: '#00A2FF',
              stroke: '#fff',
              strokeWidth: 2,
            }}
            dot={(props) => {
              const { cx, cy, index } = props;
              if (index === currentMonth) {
                // "Last Month" point
                return <circle cx={cx} cy={cy} r={8} fill="orange" stroke="#fff" strokeWidth={2} />;
              }
              if (index === lastMonth) {
                // "This Month" point
                return (
                  <circle cx={cx} cy={cy} r={8} fill="#00A2FF" stroke="#fff" strokeWidth={2} />
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px',
          gap: 3,
          position: 'absolute',
          bottom: '12px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: '#00A2FF',
              borderRadius: '50%',
              marginRight: '5px',
            }}
          />
          <Typography variant="body2" sx={{ color: '#787486', fontSize: '12px' }}>
            This Month
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: 'orange',
              borderRadius: '50%',
              marginRight: '5px',
            }}
          />
          <Typography variant="body2" sx={{ color: '#787486', fontSize: '12px' }}>
            Last Month
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LineGraph;
