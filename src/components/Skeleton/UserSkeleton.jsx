import { Skeleton, Stack, Box, Card } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 100%;
  padding: 5px;
  padding-bottom: 15px;
  position: relative;
  &:hover .menu-icon {
    display: block;
  }
  @media (min-width: 600px) {
    max-width: 280px;
  }
  @media (min-width: 960px) {
    max-width: 325px;
  }
  @media (min-width: 1024px) {
    max-width: 345px;
  }
  @media (min-width: 1280px) {
    max-width: 250px;
  }
  @media (min-width: 1180px) {
    max-width: 245px;
  }
  @media (min-width: 1400px) {
    max-width: 280px;
  }
`;

export default function UserSkeleton() {
  const skeletonArray = [
    {
      skeletonVariant: 'circular',
      skeletonWidth: 130,
      skeletonHeight: 130,
    },
    {
      skeletonVariant: 'h1',
      skeletonWidth: '50%',
      skeletonHeight: 30,
    },
    {
      skeletonVariant: 'h2',
      skeletonWidth: '40%',
      skeletonHeight: 20,
    },
    {
      skeletonVariant: 'button',
      skeletonWidth: '80%',
      skeletonHeight: 30,
    },
    {
      skeletonVariant: 'button',
      skeletonWidth: '80%',
      skeletonHeight: 30,
    },
  ];

  return (
    <StyledCard>
      <Box
        width={'auto'}
        height={290}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{ borderRadius: '15px', backgroundColor: '#f7f7f7' }}
      >
        <Stack style={{ width: '90%', height: '90%' }} spacing={1} alignItems={'center'}>
          {skeletonArray.map((element, index) => (
            <Skeleton
              key={index}
              variant={element.skeletonVariant}
              width={element.skeletonWidth}
              height={element.skeletonHeight}
              animation="wave"
              style={{
                borderRadius: element.skeletonVariant === 'circular' ? '50%' : '10px',
                backgroundColor: '#dbdbdb',
              }}
            />
          ))}
        </Stack>
      </Box>
    </StyledCard>
  );
}
