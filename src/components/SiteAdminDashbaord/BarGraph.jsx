import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import AdminLayout from '../../layouts/AdminLayout';
import { getYearsList } from '../../utils/YearList';
import DropdownField from '../Dropdown/Index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchools } from '../../redux/slices/Schools';
import { fetchanaliyticDashbaord } from '../../redux/dashboardSlices/analiyticGraph';

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
        <Typography>{`${payload[0].value} InActive & ${payload[1].value} Active`}</Typography>
      </Box>
    );
  }

  return null;
};

const AdminGraph = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(1);
  const [selectedYear, setSelectedYear] = useState('2024');
  const year = getYearsList();
  const { schools = [] } = useSelector((state) => state.schools);
  const { analiyticDashbaord } = useSelector((state) => state.analiyticDashbaord);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  useEffect(() => {
    let type;

    if (selectedTab === 0) {
      type = 'groups';
    } else if (selectedTab === 1) {
      type = 'subjects';
    } else if (selectedTab === 2) {
      type = 'classes';
    }
    const param = `school_id=${selectedSchool}&type=${type}&year=${selectedYear}`;
    dispatch(fetchanaliyticDashbaord(param));
  }, [selectedSchool, selectedYear, selectedTab, dispatch]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  const currentData = analiyticDashbaord?.analytics || [];
  const totalCount = analiyticDashbaord?.summary?.total_count || 0;
  const activeCount = analiyticDashbaord?.summary?.active_count || 0;

  const overallPerformance = totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(0) : 0;
  const schoolOptions = schools?.length
    ? schools.map((school) => ({
        label: school.name,
        value: school.id,
      }))
    : [];

  return (
    <Box
      sx={{
        width: '100%',
        padding: { xs: '8px', sm: '16px' },
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          fontSize={{ xs: '20px', sm: '28px' }}
          fontWeight={'600'}
        >
          {schoolOptions.find((school) => school.value === selectedSchool)?.label ||
            'Select a school'}
        </Typography>

        <Box
          mb={2}
          sx={{ width: { xs: '100%', sm: '50%' } }}
          display={'flex'}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={1}
        >
          <DropdownField
            name="School"
            label="Select School"
            value={selectedSchool}
            onChange={handleSchoolChange}
            options={schoolOptions}
          />
          <DropdownField
            name="year"
            label="Select Year"
            value={selectedYear}
            onChange={handleYearChange}
            options={year}
          />
        </Box>
      </Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          minHeight: '20px',
          width: { xs: '100%', sm: '305px' },
          background: 'none',
          maxWidth: '600px',
          '& .MuiTab-root': {
            fontSize: { xs: '12px', sm: '14px' },
            fontWeight: 'bold',
            textTransform: 'none',
            // color: '#878787',
            '&.Mui-selected': {
              color: '#FFA500',
            },
          },
        }}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#FFA500',
            height: '2px',
          },
        }}
      >
        <Tab label="Mobs" sx={{ padding: '5px' }} />
        <Tab label="Adventures" sx={{ padding: '5px' }} />
        <Tab label="Leaps" sx={{ padding: '5px' }} />
      </Tabs>

      <Box
        mt={1}
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
      >
        <Box display={'flex'} flexDirection={'column'} flex={'wrap'} gap={1}>
          <Typography
            variant="h1"
            fontSize={{ xs: '24px', sm: '46px' }}
            marginTop={2}
            fontWeight={'bold'}
          >
            {`${overallPerformance}%`}
          </Typography>
          <Typography
            variant="body2"
            fontSize={{ xs: '10px', sm: '12px' }}
            marginTop={1}
            color={'#878787'}
          >
            Overall Performance
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography
            variant="body2"
            fontSize={{ xs: '10px', sm: '12px' }}
            marginTop={1}
            color={'#878787'}
          >
            Latest Update:
          </Typography>
          <Typography variant="body2" fontSize={{ xs: '10px', sm: '12px' }} marginTop={1}>
            Fri, August 20
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={1} marginTop={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#FFA500',
                borderRadius: '50%',
                marginRight: '5px',
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: '#787486', fontSize: { xs: '10px', sm: '12px' } }}
            >
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
            <Typography
              variant="body2"
              sx={{ color: '#787486', fontSize: { xs: '10px', sm: '12px' } }}
            >
              Inactive
            </Typography>
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={currentData}
          barCategoryGap="15%"
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickCount={6}
            orientation="right"
          />
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }} />
          <Bar dataKey="inactive_count" fill="#E9ECF1" radius={[10, 10, 10, 10]} />
          <Bar dataKey="active_count" fill="#FFA500" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

AdminGraph.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AdminGraph;
