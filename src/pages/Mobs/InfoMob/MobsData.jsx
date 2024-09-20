import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { styled } from '@mui/system';
import TeacherIcon from '../../../assets/CardsIcon/teacherTabIcon.svg';
import TAIcon from '../../../assets/CardsIcon/taTabIcon.svg';
import UserIcon from '../../../assets/CardsIcon/userTabIcon.svg';
import { Img_BASE_URL } from '../../../config/apiConfig';

const data = {
  teachers: [],
  assistants: [],
  users: [],
};

const SeeMoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#0b0b0b',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 'bold',
  position: 'absolute',
  bottom: '20px',
  '&:hover': {
    backgroundColor: '#fff', // Keep the background color the same
    color: '#0b0b0b', // Keep the text color the same
  },
  '&:active': {
    backgroundColor: '#fff', // Keep the background color the same when clicked
    color: '#0b0b0b', // Keep the text color the same when clicked
    boxShadow: 'none', // Remove any shadow or outline effect when clicked
  },
  '&:focus': {
    outline: 'none', // Remove focus outline
  },
}));

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

export default function MobsData({ data1 }) {
  const [value, setValue] = useState(0);
  const [lenOfArray, setLenOfArray] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLenofArray = () => {
    const tabKey = value === 0 ? 'teachers' : value === 1 ? 'teacherAssistants' : 'students';
    if (isExpanded) {
      setLenOfArray(2); // Collapse the list to show only 2 items
    } else {
      setLenOfArray(data1[tabKey]?.length); // Expand to show full list
    }
    setIsExpanded(!isExpanded);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLenOfArray(2); // Reset to default length when tab changes
    setIsExpanded(false);
  };

  return (
    <Box mt={3} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          sx={{
            width: '100%',
            margin: 'auto',
            height: '60px',
            background: 'none',
          }}
          centered={!isMobile}
        >
          <Tab
            style={{ height: '50px', width: 'auto', padding: '10px 30px' }}
            label={
              <span style={{ color: value === 0 ? 'white' : '#4CAF50' }}>
                {data1.teachers?.length} Teachers
              </span>
            }
            icon={
              <Avatar
                src={TeacherIcon}
                sx={{
                  bgcolor: value === 0 ? 'white' : '#4CAF50',
                  height: '30px',
                  width: '30px',
                  color: value === 0 ? '#4CAF50' : 'white',
                }}
              />
            }
            iconPosition="start"
            {...a11yProps(0)}
            sx={{
              flexShrink: 0,
              flexBasis: 'auto',
              minWidth: isMobile ? 'auto' : '30%',
              backgroundColor: value === 0 ? '#4CAF50' : '#f4faf4',
              color: 'inherit',
              borderRadius: '15px',
              margin: '0px 4px',
              height: '30px',
              minHeight: '50px',
            }}
          />
          <Tab
            style={{ height: '50px', width: 'auto', padding: '10px 30px' }}
            label={
              <span style={{ color: value === 1 ? 'white' : '#ffa500' }}>
                {data1.teacherAssistants?.length} TA
              </span>
            }
            icon={
              <Avatar
                src={TAIcon}
                sx={{
                  bgcolor: value === 1 ? 'white' : '#ffa500',
                  height: '30px',
                  width: '30px',
                  color: value === 1 ? '#ffa500' : 'white',
                }}
              />
            }
            iconPosition="start"
            {...a11yProps(1)}
            sx={{
              flexShrink: 0,
              flexBasis: 'auto',
              minWidth: isMobile ? 'auto' : '30%',
              backgroundColor: value === 1 ? '#ffa500' : '#fff9f0',
              color: 'inherit',
              borderRadius: '15px',
              margin: '0px 4px',
              height: '30px',
              minHeight: '50px',
            }}
          />
          <Tab
            style={{ height: '50px', width: 'auto', padding: '10px 30px' }}
            label={
              <span style={{ color: value === 2 ? 'white' : '#03A9F4' }}>
                {data1.students?.length} Knowroos
              </span>
            }
            icon={
              <Avatar
                src={UserIcon}
                sx={{
                  bgcolor: value === 2 ? 'white' : '#03A9F4',
                  height: '30px',
                  width: '30px',
                  color: value === 2 ? '#03A9F4' : 'white',
                }}
              />
            }
            iconPosition="start"
            {...a11yProps(2)}
            sx={{
              flexShrink: 0,
              flexBasis: 'auto',
              minWidth: isMobile ? 'auto' : '30%',
              backgroundColor: value === 2 ? '#03A9F4' : '#e6f7fe',
              color: 'inherit',
              borderRadius: '15px',
              margin: '0px 4px',
              height: '30px',
              minHeight: '50px',
            }}
          />
        </Tabs>
      </Box>
      {/**Teacher */}
      <TabPanel value={value} index={0}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
        >
          <List
            sx={{
              borderRadius: '20px',
              width: '100%',
              margin: 'auto',
              padding: '0px',
              overflow: 'hidden',
              bgcolor: '#f5f6f7',
            }}
          >
            {data1.teachers?.slice(0, lenOfArray).map((teacher, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={index}
                  sx={{
                    paddingLeft: '8px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    height: '40px',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={`${Img_BASE_URL}/${teacher.profile_picture}`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${teacher.fname} ${teacher.lname}`} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          {data1.teachers?.length > 2 ? (
            <SeeMoreButton onClick={handleLenofArray}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </SeeMoreButton>
          ) : null}
        </Box>
      </TabPanel>
      {/* TA */}
      <TabPanel value={value} index={1}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
        >
          <List
            sx={{
              borderRadius: '20px',
              width: '100%',
              margin: 'auto',
              padding: '0px',
              overflow: 'hidden',
            }}
          >
            {data1.teacherAssistants.slice(0, lenOfArray).map((assistant, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={index}
                  sx={{
                    paddingLeft: '8px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    height: '40px',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={`${Img_BASE_URL}/${assistant.profile_picture}`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${assistant.fname} ${assistant.lname}`} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          {data1.teacherAssistants?.length > 2 ? (
            <SeeMoreButton onClick={handleLenofArray}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </SeeMoreButton>
          ) : null}
        </Box>
      </TabPanel>
      {/**User */}
      <TabPanel value={value} index={2}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
        >
          <List
            sx={{
              borderRadius: '20px',
              width: '100%',
              margin: 'auto',
              padding: '0px',
              overflow: 'hidden',
            }}
          >
            {data1.students?.slice(0, lenOfArray).map((user, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={index}
                  sx={{
                    paddingLeft: '8px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    height: '40px',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={`${Img_BASE_URL}/${user.profile_picture}`} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.fname} ${user.lname}`} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          {data1.students?.length > 2 ? (
            <SeeMoreButton onClick={handleLenofArray}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </SeeMoreButton>
          ) : null}
        </Box>
      </TabPanel>
    </Box>
  );
}
