import { Skeleton, Stack, Box, Card } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
  @media (min-width: 600px) {
    max-width: 285px;
  }
  @media (min-width: 700px) {
    max-width: 307px;
  }
  @media (min-width: 800px) {
    max-width: 365px;
  }
  @media (min-width: 850px) {
    max-width: 380px;
  }
  @media (min-width: 900px) {
    max-width: 415px;
  }
  @media (min-width: 960px) {
    max-width: 315px;
  }
  @media (min-width: 1000px) {
    max-width: 345px;
  }
  //125%
  @media (min-width: 1050px) {
    max-width: 392px;
  }
  @media (min-width: 1100px) {
    max-width: 385px;
  }
  @media (min-width: 1150px) {
    max-width: 415px;
  }
  //110%
  @media (min-width: 1200px) {
    max-width: 305px;
  }
  @media (min-width: 1250px) {
    max-width: 305px;
  }
  @media (min-width: 1300px) {
    max-width: 325px;
  }

  //100%
  @media (min-width: 1350px) {
    max-width: 347px;
  }

  @media (min-width: 1400px) {
    max-width: 352px;
  }
  @media (min-width: 1450px) {
    max-width: 362px;
  }
  @media (min-width: 1500px) {
    max-width: 390px;
  }
  //90%
  @media (min-width: 1500px) {
    max-width: 395px;
  }
  @media (min-width: 1600px) {
    max-width: 337px;
  }
  //80%
  @media (min-width: 1700px) {
    max-width: 337px;
  }
  //75%
  @media (min-width: 1800px) {
    max-width: 365px;
  }
  @media (min-width: 1900px) {
    max-width: 420px;
  }
  position: relative;
  &:hover .delete-icon-button {
    display: block;
  }
`;

export default function LeapSkeleton() {
  return (
    <StyledCard>
      <Box
        width={'auto'}
        height={330}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{ borderRadius: '15px', backgroundColor: '#f7f7f7' }}
      >
        <Stack style={{ width: '90%', height: '90%' }} spacing={1}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={130}
            animation="wave"
            style={{
              borderRadius: '10px',
              backgroundColor: '#e4e4e4',
            }}
          />

          <Skeleton
            variant="h3"
            width="50%"
            height={30}
            animation="wave"
            style={{
              borderRadius: '10px',
              backgroundColor: '#dbdbdb',
            }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={12}
            animation="wave"
            style={{
              borderRadius: '10px',
              backgroundColor: '#dbdbdb',
            }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={12}
            animation="wave"
            style={{
              borderRadius: '10px',
              backgroundColor: '#dbdbdb',
            }}
          />

          <Box
            display={'flex'}
            width={'100%'}
            height={40}
            alignItems={'center'}
            justifyContent={'space-start'}
            gap={1}
          >
            <Skeleton
              variant="button"
              width="30%"
              height={30}
              animation="wave"
              style={{
                borderRadius: '10px',
                backgroundColor: '#dbdbdb',
              }}
            />
            <Skeleton
              variant="button"
              animation="wave"
              width={30}
              height={30}
              style={{
                borderRadius: '10px',
                backgroundColor: '#dbdbdb',
              }}
            />
          </Box>

          <Box
            display={'flex'}
            width={'100%'}
            height={40}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Box display={'flex'}>
              <Skeleton variant="circular" animation="wave" width={30} height={30} />
              <Skeleton variant="circular" animation="wave" width={30} height={30} />
            </Box>
            <Skeleton
              variant="button"
              width="50%"
              height={40}
              animation="wave"
              style={{
                borderRadius: '10px',
                backgroundColor: '#dbdbdb',
              }}
            />
          </Box>
        </Stack>
      </Box>
    </StyledCard>
  );
}
