import { Container, Box } from '@mui/material';
import Profile from '../../components/DashboardComponents/Profile';
import AreaGraph from '../../components/DashboardComponents/AreaGraph';
import LineGraph from '../../components/DashboardComponents/LineGraph';
import UsersGraph from '../../components/DashboardComponents/UsersGraph';
import CircularGraph from '../../components/DashboardComponents/CircularGraph';
import HalfCircularGraph from '../../components/DashboardComponents/HalfCircularGraph';
const DashBoard = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          bgcolor: '#FAFAFA',
          maxWidth: '100vw !important',
          height: 'auto',
          padding: '0px !important',
        }}
      >
        <Box display={'flex'} flexWrap={'wrap'} gap={1} justifyContent={'center'}>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Profile />
            <UsersGraph />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <AreaGraph />
            <CircularGraph
              totalMobs={4000}
              availableMobs={3800}
              activeMobs={2700}
              inactiveMobs={1100}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <LineGraph />
            <HalfCircularGraph totalMobs={4000} activeMobs={2500} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DashBoard;
