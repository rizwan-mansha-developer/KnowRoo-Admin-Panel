import { Container, Box } from '@mui/material';
import DashbaordLeaderBoard from '../../components/TeacherDashbaord/MobsLeaderBoard';
import LeapsDashbaordLeaderBoard from '../../components/TeacherDashbaord/LeapsLeaderBoard';
import DoubleBarGraph from './../../components/TeacherDashbaord/BarGraph';
import AdminLayout from '../../layouts/AdminLayout';
// import Profile from '../../components/DashboardComponents/Profile';
// import AreaGraph from '../../components/DashboardComponents/AreaGraph';
// import LineGraph from '../../components/DashboardComponents/LineGraph';
// import UsersGraph from '../../components/DashboardComponents/UsersGraph';
// import CircularGraph from '../../components/DashboardComponents/CircularGraph';
// import HalfCircularGraph from '../../components/DashboardComponents/HalfCircularGraph';
// import MobsLeaderBoard from '../../components/SecondDBComponents/MobsLeaderBoard';
// import LeapsLeaderBoard from '../../components/SecondDBComponents/LeapsLeaderBoard';
// import MarqueeComponent from '../../components/SecondDBComponents/Marquee';
// import DoubleBarGraph from '../../components/SecondDBComponents/BarGraph';

const TeacherDashBoard = () => {
  return (
    <AdminLayout>
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
            <DashbaordLeaderBoard />
            <LeapsDashbaordLeaderBoard />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            {/* <MarqueeComponent /> */}
            <DoubleBarGraph AdvPercentage={86} LeapPercentage={57} />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            {/* <LineGraph />
            <HalfCircularGraph totalMobs={4000} activeMobs={2500}/> */}
          </Box>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default TeacherDashBoard;
