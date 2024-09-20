import { Container, Box, Grid } from '@mui/material';
import AdminGraph from '../../components/SiteAdminDashbaord/BarGraph';
import DashbaordHeaderCard from '../../components/SiteAdminDashbaord/Headercard';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSiteAdminDashbaord } from '../../redux/dashboardSlices/SiteAdminSlice';
import { useEffect } from 'react';
import _ from 'lodash';
import SliderComponent from '../../components/SiteAdminDashbaord/Slider';

const SiteAdminDashBoard = () => {
  const dispatch = useDispatch();
  const { siteAdminDashbaord } = useSelector((state) => state.siteAdminDashbaord);

  useEffect(() => {
    dispatch(fetchSiteAdminDashbaord());
  }, [dispatch]);

  const getDisplayName = (type) => {
    switch (type) {
      case 'total_schools':
        return 'Schools/Company';
      case 'total_groups':
        return 'Mobs';
      case 'total_subjects':
        return 'Adventures';
      case 'total_classes':
        return 'Leaps';
      default:
        return type;
    }
  };

  return (
    <AdminLayout>
      <Container
        sx={{
          maxWidth: '100vw',
          padding: { xs: '10px', sm: '15px', md: '20px' },
          bgcolor: '#FAFAFA',
          borderRadius: '12px',
          display: 'flex',
          // maxWidth: '100vw !important',
        }}
      >
        <Grid container spacing={2}>
          {/* Main content grid (Left side) */}
          <Grid item xs={12} md={8}>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              {/* Header cards */}
              <Grid container spacing={2}>
                {_.map(siteAdminDashbaord?.summary, (summary) => (
                  <Grid item xs={12} sm={5} md={3} key={summary.type}>
                    <DashbaordHeaderCard
                      score={summary.count}
                      name={getDisplayName(summary.type)}
                      changevalue={summary.change}
                    />
                  </Grid>
                ))}
              </Grid>
              {/* Graph section */}
              <Box mt={2}>
                <AdminGraph />
              </Box>
            </Box>
          </Grid>

          {/* Slider Component (Right side) */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: '100%',
                overflow: 'hidden',
                mt: { xs: 2, md: 0 }, // Adds margin-top for mobile screens
              }}
            >
              <SliderComponent schools={siteAdminDashbaord?.schools_with_activities} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default SiteAdminDashBoard;
