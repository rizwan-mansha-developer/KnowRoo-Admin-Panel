import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

import { useSelector } from 'react-redux';
import LeapsList from './AddLeapsList';
import AddLeapsInAdv from './AddLeaps';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddAssignLeapsInMob({ getAdvId }) {
  const [value, setValue] = useState(0);
  const { addStatus } = useSelector((state) => state.addleaps);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (addStatus === 'success') {
      setValue(0); // Call the function to change tabs
    }
  }, [addStatus]);

  return (
    <Box mt={3} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Assign Leaps" {...a11yProps(0)} />
          <Tab label="Add Leaps" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Assign Adventure Tab */}
      <TabPanel value={value} index={0}>
        {/* Content for Assign Adventure */}
        <Box>
          {/* Your content for Assign Adventure goes here */}
          <LeapsList getAdvId={getAdvId} />
        </Box>
      </TabPanel>

      {/* Add Adventure Tab */}
      <TabPanel value={value} index={1}>
        {/* Content for Add Adventure */}
        <Box>
          {/* Your content for Add Adventure goes here */}
          <AddLeapsInAdv />
        </Box>
      </TabPanel>
    </Box>
  );
}
