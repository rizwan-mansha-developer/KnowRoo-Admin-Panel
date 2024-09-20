import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import styled from 'styled-components';
import HomeIcon from '../../assets/navbarIcon/home.svg'; // Import the home icon
import routes from '../../routes/Route';
import Cookies from 'js-cookie';
// Styled component for breadcrumb links
const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: black; /* Default color for non-current routes */
  &:hover {
    text-decoration: underline;
  }
`;

// Styled component for breadcrumb text
const BreadcrumbText = styled(Typography)`
  font-size: 20px;
  color: #ffa500; /* Color for the current route */
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Helper function to find route name based on path
const findRouteName = (path, routes) => {
  for (const route of routes) {
    if (route.path === path) {
      return route.name;
    }
    if (route.subRoute) {
      const subRouteName = findRouteName(path, route.subRoute);
      if (subRouteName) {
        return subRouteName;
      }
    }
  }
  return null;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate(); // To navigate when home icon is clicked
  const paths = location.pathname.split('/').filter((x) => x);
  const getRole = Cookies.get('role_id');
  // Check if the current route is the dashboard
  const isDashboard =
    location.pathname === '/dashboard' ||
    location.pathname === '/adminDashbaord' ||
    location.pathname === '/teacherDashboard';

  const generatePath = (paths) => {
    return paths.map((path, index) => {
      const isLast = index === paths.length - 1;
      const fullPath = `/${paths.slice(0, index + 1).join('/')}`;
      const routeName = findRouteName(paths[index], routes) || capitalizeFirstLetter(path);

      return isLast ? (
        <BreadcrumbText key={fullPath}>{routeName}</BreadcrumbText>
      ) : (
        <BreadcrumbLink to={fullPath} key={fullPath}>
          {routeName}
        </BreadcrumbLink>
      );
    });
  };

  // Handle click on the home icon to navigate to the dashboard
  const handleHomeClick = () => {
    if (getRole == 1) {
      navigate('/adminDashbaord');
    } else if (getRole == 2) {
      navigate('/dashboard');
    } else {
      navigate('/teacherDashboard');
    }
  };

  return (
    <MuiBreadcrumbs separator="›" aria-label="breadcrumb">
      {/* Home icon links to the dashboard */}
      <BreadcrumbLink
        as="button"
        onClick={handleHomeClick}
        style={{ background: 'none', border: 'none' }}
      >
        <img src={HomeIcon} alt="Home" />
      </BreadcrumbLink>

      {/* If on dashboard, do not render the breadcrumb path */}
      {!isDashboard && generatePath(paths)}
    </MuiBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      subRoute: PropTypes.array,
    })
  ),
};

export default Breadcrumbs;
