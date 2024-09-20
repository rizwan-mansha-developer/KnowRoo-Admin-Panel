import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';
import AdminLayout from '../../layouts/AdminLayout';
import TeamMobs from './TeamMobs';
import IndevidualMobs from './IndevidualMobs';
// import LeapsList from './AddLeapsList';
// import AddLeapsInAdv from './AddLeaps';

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
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MobsTabs({ getAdvId }) {
  const [value, setValue] = useState(0);
  const { addStatus } = useSelector((state) => state.addleaps);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (addStatus === 'success') {
      setValue(0); // Call the function to change tabs
    }
  }, [addStatus]);

  return (
    <Box mt={1} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs
          sx={{
            width: isMobile ? '90%' : '40%',
            // margin: 'auto',

            height: '50px',
            background: 'none',
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            sx={{
              flexShrink: 0,
              flexBasis: 'auto',
              minWidth: isMobile ? 'auto' : '30%',
              backgroundColor: value === 0 ? '#FFA500' : '#fceed3',
              color: '#616161',
              // borderRadius: '15px',
              margin: '0px 4px',
              // height: '30px',
              minHeight: '50px',
            }}
            label={
              <span
                style={{
                  color: value === 0 ? 'white' : '#FFA500',
                  whiteSpace: 'nowrap',
                }}
              >
                Individual Mobs
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              flexShrink: 0,
              flexBasis: 'auto',
              Width: isMobile ? 'auto' : '30%',
              backgroundColor: value === 1 ? '#FFA500' : '#fceed3',
              color: '#616161',
              // borderRadius: '15px',
              margin: '0px 4px',
              // height: '30px',
              minHeight: '50px',
            }}
            label={
              <span
                style={{
                  color: value === 1 ? 'white' : '#FFA500',
                  whiteSpace: 'nowrap',
                }}
              >
                Team Mobs
              </span>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* Content for Assign Adventure */}
        <Box>
          {/* Your content for Assign Adventure goes here */}
          <IndevidualMobs />
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* Content for Add Adventure */}
        <Box>
          {/* Your content for Add Adventure goes here */}
          <TeamMobs />
        </Box>
      </TabPanel>
    </Box>
  );
}
