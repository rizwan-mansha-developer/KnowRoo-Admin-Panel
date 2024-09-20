import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
// import DropdownIcon from '../../assets/Icons/DropdownIcon.svg';
import SlideBar from './CustomComponents/SlideBar';
import { Img_BASE_URL } from '../../config/apiConfig';

const UsersGraph = ({ userActivity }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  console.log(userActivity);

  return (
    <Box
      sx={{
        width: 'auto',
        height: '400px',
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
          Knowroos
        </Typography>
        {/* <Button onClick={handleMenuOpen}
          // endIcon={<img src={DropdownIcon}
          //   alt="Dropdown Icon" />}
          sx={{ borderRadius: 3, backgroundColor: '#E9ECF1', color: '#787486', boxShadow: 'none', width: '110px', fontSize: 12 }}>
          this week
        </Button> */}
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
        </Menu> */}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        height={'350px'}
        justifyContent={'space-evenly'}
        zIndex={1}
      >
        <Box display={'flex'} alignItems={'center'} width={'85%'} justifyContent={'space-between'}>
          <Typography variant="h6" fontSize={14} fontWeight={'bold'}>
            Active
          </Typography>
          <SlideBar
            percentage={userActivity?.active?.percentage}
            Image1={`${Img_BASE_URL}/${userActivity?.active?.profile_picture_1}`}
            Image2={`${Img_BASE_URL}/${userActivity?.active?.profile_picture_2}`}
            count={userActivity?.active?.count}
            slideColor={'#4CAF50'}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} width={'90%'} justifyContent={'space-between'}>
          <Typography variant="h6" fontSize={14} fontWeight={'bold'}>
            Inactive
          </Typography>
          <SlideBar
            percentage={userActivity?.inactive?.percentage}
            Image1={`${Img_BASE_URL}/${userActivity?.inactive?.profile_picture_1}`}
            Image2={`${Img_BASE_URL}/${userActivity?.inactive?.profile_picture_2}`}
            count={userActivity?.inactive?.count}
            slideColor={'#FD521B'}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} width={'95%'} justifyContent={'space-between'}>
          <Typography variant="h6" fontSize={14} fontWeight={'bold'}>
            Change Over Time
          </Typography>
          <SlideBar
            percentage={userActivity?.change_over_time?.percentage}
            Image1={`${Img_BASE_URL}/${userActivity?.change_over_time?.profile_picture_1}`}
            Image2={`${Img_BASE_URL}/${userActivity?.change_over_time?.profile_picture_2}`}
            count={userActivity?.change_over_time?.count}
            slideColor={'#FFA500'}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} width={'90%'} justifyContent={'space-between'}>
          <Typography variant="h6" fontSize={14} fontWeight={'bold'}>
            Total Users
          </Typography>
          <SlideBar
            percentage={userActivity?.total_users?.percentage}
            Image1={`${Img_BASE_URL}/${userActivity?.total_users?.profile_picture_1}`}
            Image2={`${Img_BASE_URL}/${userActivity?.total_users?.profile_picture_2}`}
            count={userActivity?.total_users?.count}
            slideColor={'#03A9F4'}
          />
        </Box>
      </Box>

      {/* Container for vertical lines */}
      <Box
        sx={{
          width: '70%',
          height: '300px',
          position: 'absolute',
          top: '70px',
          left: '20%',
          display: 'flex',
          justifyContent: 'space-between',
          paddingX: '10px',
          zIndex: 0,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              height: '100%',
              border: '1px dashed silver',
              //   backgroundColor: "#ccc",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UsersGraph;
