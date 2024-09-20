import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Profileimg from '../../assets/profile.svg';
import { AppBarStyled, MenuButton, ProfileAvatar, ProfileBox, ToolbarStyled } from './style';
import PropTypes from 'prop-types';
import routesConfig from '../../routes/Route';

import Cookies from 'js-cookie';
import { Img_BASE_URL } from '../../config/apiConfig';
const MobileNavbar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu
  const Profile = Cookies.get('user_profile');
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
  };

  const handleProfileClick = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu
  };

  const findRouteName = (pathArray, routes) => {
    let routeName = [];
    let currentRoutes = routes;

    for (const path of pathArray) {
      const route = currentRoutes.find((route) => route.path.replace('/', '') === path);
      if (route) {
        routeName.push({ path, name: route.name });
        currentRoutes = route.subRoute || [];
      }
    }

    return routeName;
  };

  const routes = findRouteName(pathnames, routesConfig);

  return (
    <AppBarStyled position="fixed" style={{ top: isScrolled ? 0 : '15px' }}>
      <ToolbarStyled>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            width: '100%',
            height: `50px`,
            boxShadow: '0px 1px 13px -12px #b4c3db',
            padding: '10px 20px',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <MenuButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: { xs: 1, sm: 2, md: 3 } }}
            >
              <MenuIcon />
            </MenuButton>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ProfileBox display="flex" justifyContent="space-between">
              <ProfileAvatar
                style={{ height: '30px', width: '30px' }}
                alt="Profile Image"
                src={`${Img_BASE_URL}/${Profile}`}
              />
            </ProfileBox>
          </Box>
        </Box>
        {isMenuOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '100px',
              right: '20px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 1px 13px -12px #b4c3db',
              borderRadius: '10px',
              padding: '10px',
              zIndex: 1000,
            }}
          >
            <Typography> Item 1</Typography>
            <Typography> Item 2</Typography>
            <Typography> Item 3</Typography>
          </Box>
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

// PropTypes validation
MobileNavbar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default MobileNavbar;
