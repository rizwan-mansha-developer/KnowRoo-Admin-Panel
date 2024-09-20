import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { AppBarStyled, MenuButton, Notfication, ProfileBox, Setting, ToolbarStyled } from './style';
import Arrowdown from '../../assets/navbarIcon/arrow-down.svg';
import NotficationIcon from '../../assets/navbarIcon/notification-bing.svg';
import SearchIcon from '../../assets/navbarIcon/search-normal.svg';
import SettingIcon from '../../assets/navbarIcon/Setting.svg';
import Profileimg from '../../assets/profile.svg';
import Logo from '../../assets/SidebarLogo.svg';
import Breadcrumbs from '../Breadcrumbs/Breadcrumb';
import ArrowCloseIcon from '../Svg/ArrowIcon';
import ArrowOpenIcon from '../Svg/ArrowOpen';

import routesConfig from '../../routes/Route';
import Cookies from 'js-cookie';
import { Img_BASE_URL } from '../../config/apiConfig';
const Navbar = ({ handleDrawerToggle, isMinimized }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the menu
  const UserName = Cookies.get('user_name');
  const Profile = Cookies.get('user_profile');
  const Role_ID = parseInt(Cookies.get('role_id'), 10);

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
  const getUserDesignation = (role_id) => {
    switch (role_id) {
      case 1:
        return 'Site Admin';
      case 2:
        return 'School Admin';
      case 3:
        return 'Teacher';
      case 4:
        return 'Teacher Assistant';
      case 5:
        return 'Knowroos';
      default:
        return 'Unknown';
    }
  };
  return (
    <AppBarStyled position="fixed" style={{ top: isScrolled ? -2 : '15px', zIndex: '1201' }}>
      <ToolbarStyled>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            width: '100%',
            height: `60px`,
            boxShadow: '0px 1px 13px -12px #b4c3db',
            padding: '10px 20px',
            marginLeft: isMinimized ? '74px' : '220px',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="none"
          >
            <MenuButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ marginRight: { xs: 1, sm: 2, md: 3 } }}
            >
              <MenuIcon />
            </MenuButton>
            <Breadcrumbs />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Notfication>
              <img src={NotficationIcon} alt="Notification Icon" />
            </Notfication>
            <Setting>
              <img src={SettingIcon} alt="Setting Icon" />
            </Setting>
            <ProfileBox display="flex" justifyContent="space-between">
              <Avatar
                style={{ width: '50px', height: '50px' }}
                alt="Profile Image"
                src={`${Img_BASE_URL}/${Profile}`}
              />
              <Typography
                sx={{ margin: 'auto 15px', fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '14px', sm: '15px', md: '17px' },
                    fontWeight: 'bold',
                    color: '#1B1D28',
                  }}
                >
                  {UserName}
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: '11px', sm: '12px', md: '13px' }, color: '#4CAF50' }}
                  mt={-0.5}
                >
                  {getUserDesignation(Role_ID)}
                </Typography>
              </Typography>
              {/*  <Typography style={{ marginTop: "10px" }}> {isMenuOpen ? <ArrowOpenIcon /> : <ArrowCloseIcon />} </Typography>*/}
            </ProfileBox>
          </Box>
        </Box>
        {isMenuOpen && (
          <Box
            sx={{
              position: 'absolute',
              top: '100px', // Adjust as needed
              right: '20px', // Adjust as needed
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
Navbar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool.isRequired,
};

export default Navbar;
