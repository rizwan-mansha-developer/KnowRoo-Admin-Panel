import { Skeleton, Stack, Box } from '@mui/material';

export default function AdventureRecentSkeleton() {
  return (
    <Box
      width={350}
      height={130}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      style={{ borderRadius: '15px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <Stack style={{ width: '90%', height: '90%' }} spacing={1}>
        <Box
          display={'flex'}
          width={'100%'}
          height={10}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Skeleton
            variant="text"
            width="25%"
            height={20}
            animation="wave"
            style={{
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
            }}
          />
          <Box
            display={'flex'}
            width={'60%'}
            height={40}
            alignItems={'center'}
            justifyContent={'end'}
            gap={1}
          >
            <Skeleton
              variant="button"
              width="40%"
              height={30}
              animation="wave"
              style={{
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
              }}
            />
            <Skeleton
              variant="text"
              width="25%"
              height={15}
              animation="wave"
              style={{
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
              }}
            />
          </Box>
        </Box>
        <Skeleton
          variant="h3"
          width="30%"
          height={30}
          animation="wave"
          style={{
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation="wave"
          style={{
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          }}
        />
      </Stack>
    </Box>
  );
}
