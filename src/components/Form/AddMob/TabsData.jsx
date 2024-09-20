import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import AddAdventure from '../AddAdvanture/Index';
import AdventureList from './AdventureList';
import AddAdvInMob from './AddAdventure';
import { useSelector } from 'react-redux';
import { fontWeight } from '@mui/system';

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

export default function AddAdventureInMob({ getAdvId }) {
  const [value, setValue] = useState(0);
  const { status } = useSelector((state) => state.addadventure);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (status === 'success') {
      setValue(0); // Call the function to change tabs
    }
  }, [status]);

  return (
    <Box mt={3} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab
            style={{ fontWeight: '600', backgroundColor: value === 0 ? '#FFA500' : '#fceed3' }}
            label={
              <span
                style={{
                  color: value === 0 ? 'white' : '#FFA500',
                  whiteSpace: 'nowrap',
                }}
              >
                Assign Adventure
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontWeight: '600', backgroundColor: value === 1 ? '#FFA500' : '#fceed3' }}
            label={
              <span
                style={{
                  color: value === 1 ? 'white' : '#FFA500',
                  whiteSpace: 'nowrap',
                }}
              >
                Add Adventure
              </span>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      {/* Assign Adventure Tab */}
      <TabPanel value={value} index={0}>
        {/* Content for Assign Adventure */}
        <Box>
          {/* Your content for Assign Adventure goes here */}
          <AdventureList getAdvId={getAdvId} />
        </Box>
      </TabPanel>

      {/* Add Adventure Tab */}
      <TabPanel value={value} index={1}>
        {/* Content for Add Adventure */}
        <Box>
          {/* Your content for Add Adventure goes here */}
          <AddAdvInMob />
        </Box>
      </TabPanel>
    </Box>
  );
}
