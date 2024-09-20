import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, LinearProgress, AvatarGroup } from '@mui/material';
import { height, styled } from '@mui/system';
// import AvatarImage1 from '../../../assets/AvatarImage1.png'
// import AvatarImage2 from '../../../assets/AvatarImage2.png'

const ProgressBar = styled(LinearProgress)(({ theme, slideColor, value }) => ({
  width: '100%',
  borderRadius: 50,
  backgroundColor: `${slideColor}33`, // Background with 20% opacity
  '& .MuiLinearProgress-bar': {
    borderRadius: 50,
    height: 45,
    width: `${value}%`,
    backgroundColor: slideColor, // Solid color for the progress bar
  },
}));

const SlideBar = ({ percentage, slideColor, Image1, Image2, count }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(percentage); // Set to the desired percentage
    }, 3000); // Delay to start the animation
  }, [percentage]);

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: '#f0f0f0',
        borderRadius: '50px',
        width: '400px',
        position: 'relative',
      }}
    >
      <Box display="flex" alignItems="center" pr={1} position={'absolute'} zIndex={1} left={15}>
        {count !== 0 ? (
          <AvatarGroup max={2}>
            <Avatar src={Image1} sx={{ width: 30, height: 30 }} />
            <Avatar src={Image2} sx={{ width: 30, height: 30 }} />
          </AvatarGroup>
        ) : null}
        <Box
          bgcolor={'#EBF9FF'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          py={0.4}
          px={1}
          ml={-1}
          zIndex={1}
          borderRadius={10}
        >
          <Typography variant="body2" fontWeight="bold" color={slideColor}>
            {count}
          </Typography>
        </Box>
        <Typography variant="body2" ml={1} color={'#FFFFFF'} fontWeight={'bold'}>
          Knowroos
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <ProgressBar
          slideColor={slideColor}
          variant="determinate"
          value={progress}
          sx={{ height: '45px', zIndex: 0 }}
        />
      </Box>

      <Box
        bgcolor={'#EBF9FF'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        py={0.5}
        px={1}
        borderRadius={5}
        sx={{ position: 'absolute', right: '10px' }}
      >
        <Typography variant="body2" ml="auto" fontWeight={'bold'}>
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export default SlideBar;
