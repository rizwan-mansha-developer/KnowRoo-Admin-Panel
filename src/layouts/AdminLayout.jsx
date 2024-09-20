import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MobileNavbar from '../components/Navbar/MobileNavbar';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const LogoImg = styled.img`
  height: 50px;
  transition: width 0.3s;
  width: ${({ isMinimized }) => (isMinimized ? '54px' : '240px')};
`;

const Header = styled(Box)`
  display: flex;
  // align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  position: fixed;
  width: 100%;
  margin-top: 20px;
  z-index: 1200;
`;

const HeaderContent = styled(Box)`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: ${({ isMinimized }) => (isMinimized ? '50px' : '240px')};
  transition: margin-left 0.3s;

  @media (max-width: 960px) {
    margin-left: 0;
  }
`;

const MainContent = styled(Box)`
  padding: 24px 4px;
  padding-right: 24px;
  width: calc(98.5% - ${({ isMinimized }) => (isMinimized ? '74px' : '220px')});
  transition: margin 0.3s;
  margin-left: ${({ isMinimized }) => (isMinimized ? '74px' : '220px')};

  @media (max-width: 960px) {
    margin-left: 0;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 16px;
  }
`;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isMobileOrTablet = useMediaQuery('(max-width: 960px)');
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleDrawerToggle = (state) => {
    if (isMobileOrTablet) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 960) {
        setMobileOpen(false);
      }
      if (window.innerWidth <= 835 && window.innerHeight <= 1280) {
        setMobileOpen(false);
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', display: 'flex', justifyContent: 'center', zIndex: '1200' }}>
        <HeaderContent isMinimized={isMinimized} mobileOpen={mobileOpen}>
          {isMobileOrTablet ? (
            <MobileNavbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
          ) : (
            <Navbar handleDrawerToggle={handleDrawerToggle} isMinimized={isMinimized} />
          )}
        </HeaderContent>
      </Box>
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        setMobileOpen={setMobileOpen}
        isMinimized={isMinimized}
      />
      <MainContent
        style={{ paddingLeft: isMobileOrTablet ? '16px' : '7px' }}
        isMinimized={isMinimized}
      >
        <Toolbar />
        {children}
      </MainContent>
    </Box>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
