import React from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

const MarqueeComponent = () => {
  return (
    <Box
      width={'965px'}
      paddingY={4}
      paddingX={4}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      bgcolor={'#FFFFFF'}
      borderRadius={5}
      boxShadow={'0 2px 10px rgba(0, 0, 0, 0.1)'}
    >
      <Marquee gradient={false} speed={50} pauseOnHover>
        <Typography
          variant="h5"
          component="span"
          style={{ marginRight: '20px', fontWeight: 'bold' }}
        >
          This is some marquee text scrolling from right to left.
        </Typography>
        <Typography
          variant="h5"
          component="span"
          style={{ marginRight: '20px', fontWeight: 'bold' }}
        >
          You can add more text, and it will scroll smoothly.
        </Typography>
        <Typography
          variant="h5"
          component="span"
          style={{ marginRight: '20px', fontWeight: 'bold' }}
        >
          Feel free to customize the content!
        </Typography>
      </Marquee>
    </Box>
  );
};

export default MarqueeComponent;
