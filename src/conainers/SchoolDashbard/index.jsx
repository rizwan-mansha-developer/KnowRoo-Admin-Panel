import { Container, Box, Grid, Typography } from '@mui/material';
import AdminLayout from './../../layouts/AdminLayout';

import Profile from '../../components/SchoolDashboard/Profile';
import LineGraph from '../../components/SchoolDashboard/LineGraph';
import UsersGraph from '../../components/SchoolDashboard/UsersGraph';
import CircularGraph from '../../components/SchoolDashboard/CircularGraph';
import HalfCircularGraph from '../../components/SchoolDashboard/HalfCircularGraph';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSchoolDashbaord } from '../../redux/dashboardSlices/SchoolAdminSlice';
import TeacherActivity from '../../components/SchoolDashboard/AreaGraph';
import TeacherTable from '../../components/SchoolDashboard/TeacherTable';
import DashbaordMobsCard from '../../components/Card/MobDashbaordCard';
import { Img_BASE_URL } from '../../config/apiConfig';
import MobsCard from '../../components/Card/Mobs';
import Cookies from 'js-cookie';
import DropdownField from '../../components/Dropdown/Index';
const SchoolDashBoard = () => {
  const dispatch = useDispatch();
  const { schoolDashbaord, loading, error } = useSelector((state) => state.schoolDashbaord);
  const date = 'year=2024&month=9';

  const UserName = Cookies.get('user_name');
  const ProfilePic = Cookies.get('user_profile');
  const [selectedDate, setselectedDate] = useState('2024');
  useEffect(() => {
    dispatch(fetchSchoolDashbaord(date));
  }, [date, dispatch]);

  const handleYearChange = (e) => {
    const { name, value } = e.target;
    setselectedDate(value);
  };

  const generateDateOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    for (let year = currentYear; year >= currentYear - 5; year--) {
      for (let month = 11; month >= 0; month--) {
        const formattedMonth = (month + 1).toString().padStart(2, '0'); // Adding 1 to convert to 1-based index
        options.push({
          label: `${year}/${formattedMonth}`,
          value: `${year}/${formattedMonth}`,
        });
      }
    }
    return options;
  };
  const MontYear = generateDateOptions();

  return (
    <AdminLayout>
      <Container
        maxWidth={false}
        sx={{
          bgcolor: '#FAFAFA',
          padding: '20px',
          borderRadius: '10px',
          width: '100%', // Full width
          minHeight: '100vh', // Full height of the viewport
          margin: 0, // Ensure no margin around the container
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}
      >
        {/* <DropdownField
          name="year"
          label=" Select Year"
          value={selectedDate}
          onChange={handleYearChange}
          options={MontYear}
        /> */}

        <Grid container spacing={2}>
          {/* Row 1: Profile and Mob Card */}
          <Grid item xs={12} md={6} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            <Profile
              username={UserName}
              pic={`${Img_BASE_URL}/${ProfilePic}`}
              schoolName={schoolDashbaord.school?.name}
            />
            {schoolDashbaord?.HighestRatedGroups?.[0] && (
              <MobsCard
                id={schoolDashbaord.HighestRatedGroups[0].group_id}
                img={`${Img_BASE_URL}/${schoolDashbaord.HighestRatedGroups[0].thumbnail}`}
                MobsName={schoolDashbaord.HighestRatedGroups[0].name}
                MobsDetails={schoolDashbaord.HighestRatedGroups[0].description}
                avatars={[
                  `${Img_BASE_URL}/${schoolDashbaord.HighestRatedGroups[0].profile_picture_1}`,
                  `${Img_BASE_URL}/${schoolDashbaord.HighestRatedGroups[0].profile_picture_2}`,
                ]}
                userCount={schoolDashbaord.HighestRatedGroups[0].total_users}
                CurrentStatus={schoolDashbaord.HighestRatedGroups[0].status_id}
              />
            )}
          </Grid>

          {/* Row 2: Teacher Activity and Leaps Activity */}
          <Grid item xs={12} md={5} lg={3}>
            <TeacherActivity teacherActivity={schoolDashbaord.teacher_activity} />
          </Grid>
          <Grid item xs={12} md={5} lg={3}>
            <LineGraph leapActivity={schoolDashbaord.class_activity} />
          </Grid>

          {/* Row 3: User Graph, Circular Graph, Half Circular Graph */}
          <Grid item xs={12} md={6} lg={6}>
            <UsersGraph userActivity={schoolDashbaord?.user_analytics} />
          </Grid>
          <Grid item xs={12} md={5} lg={3}>
            <CircularGraph
              totalMobs={schoolDashbaord?.groups_activity?.total_groups}
              availableMobs={0}
              activeMobs={schoolDashbaord?.groups_activity?.active_groups}
              inactiveMobs={schoolDashbaord?.groups_activity?.inactive_groups}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <HalfCircularGraph
              ActiveAdventure={schoolDashbaord?.subjects_activity?.active_percentage}
              InActiveAdventure={schoolDashbaord?.subjects_activity?.inactive_percentage}
            />
          </Grid>

          {/* Mob Cards and Teacher Table */}
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                gutterBottom
                fontSize={18}
                fontWeight={'700'}
                color={'#4CAF50'}
              >
                Highest Rated Mobs
              </Typography>
              <Grid container spacing={2}>
                {schoolDashbaord?.HighestRatedGroups?.map(
                  (group, index) =>
                    index !== 0 && (
                      <Grid item xs={12} sm={6} key={group.id}>
                        <DashbaordMobsCard
                          id={group.group_id}
                          img={`${Img_BASE_URL}/${group.thumbnail}`}
                          MobsName={group.name}
                          MobsDetails={group.description}
                          avatars={[
                            `${Img_BASE_URL}/${group.profile_picture_1}`,
                            `${Img_BASE_URL}/${group.profile_picture_2}`,
                          ]}
                          userCount={group.total_users}
                          CurrentStatus={group.status_id}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <TeacherTable data={schoolDashbaord.teachers} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default SchoolDashBoard;
