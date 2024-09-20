import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import AdminLayout from '../layouts/AdminLayout';

const Dashboard = ({ data }) => {
  return (
    <AdminLayout>
      <Typography variant="h1" style={{ marginTop: '50px' }}>
        Dashboard
      </Typography>
      {/* Render your data here */}
    </AdminLayout>
  );
};
Dashboard.propTypes = {
  data: PropTypes.string,
};
export default Dashboard;
