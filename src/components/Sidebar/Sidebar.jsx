import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Tooltip,
} from '@mui/material';
import { DrawerHeader, LogoImg, MinLogoImg, ProfileBox, ScrollableContent } from './style';
import MinLogo from '../../assets/miniLogo.svg';
import Logo from '../../assets/SidebarLogo.svg';
import { AuthContext } from '../../conainers/Authentication/AuthContext';
import AddAdventure from '../Form/AddAdvanture/Index';
import AddLeaps from '../Form/AddLeaps/Index';
import AddMobs from '../Form/AddMob/Index';
import AddQuizForm from '../Form/AddQuiz/Index';
import AddSchools from '../Form/AddSchools/Index';
import AddUser from '../Form/AddUser/Index';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import AddNew from '../Svg/Addnew';
import AdvanctureIcon from '../Svg/AdvanctureIcon';
import ArrowCloseIcon from '../Svg/ArrowIcon';
import ArrowOpenIcon from '../Svg/ArrowOpen';
import DashboardIcon from '../Svg/DashboardIcon';
import LeapsIcon from '../Svg/Leaps';
import MobsIcon from '../Svg/MobsIcon';
import SchoolIcon from '../Svg/schoolcon';
import SignoutIcon from '../Svg/Singout';
import UserIcon from '../Svg/UserIcon';
import Cookies from 'js-cookie';

import routes from '../../routes/Route';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
const Sidebar = ({ mobileOpen, handleDrawerToggle, isMinimized, setMobileOpen }) => {
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [schoolId, setSchoolId] = useState(null);
  const roleId = parseInt(Cookies.get('role_id'));
  const MobsId = Cookies.get('mobs_Id');
  const IsTeacher = Cookies.get('is_teacher');
  const id = parseInt(Cookies.get('schoolId'));
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { authToken, logout } = useContext(AuthContext);
  useEffect(() => {
    setSchoolId(id);
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleDrawerToggle]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSignoutClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmSignout = async () => {
    setOpenConfirmDialog(false);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCancelSignout = () => {
    setOpenConfirmDialog(false);
  };

  const isTabDisable = (path) => {
    if (
      roleId === 1 &&
      !schoolId &&
      !['schools', 'adminDashbaord'].some((substring) => path.includes(substring))
    ) {
      return true;
    } else if (
      roleId === 2 &&
      schoolId &&
      ['schools'].some((substring) => path.includes(substring))
    ) {
      return true;
    } else if (
      (roleId === 3 || roleId == 4 || roleId === 5) &&
      schoolId &&
      ['schools', 'dashboard', 'knowroos'].some((substring) => path.includes(substring))
    ) {
      return true;
      // }
      // else if (
      //   !MobsId &&
      //   !['schools', 'dashboard', 'knowroos', 'mobs'].some((substring) => path.includes(substring))
      // ) {
      //   return true;
      // } else if (
      //   !AdvId &&
      //   !['schools', 'dashboard', 'knowroos', 'mobs', 'adventure'].some((substring) =>
      //     path.includes(substring)
      //   )
      // ) {
      //   return true;
      // } else {
      return false;
    }
  };

  const isTabHide = (path) => {
    if (
      roleId === 2 &&
      ['schools', 'adminDashbaord'].some((substring) => path.includes(substring))
    ) {
      return true;
    } else if (roleId === 1 && ['dashboard'].some((substring) => path.includes(substring))) {
      return true;
    } else if (
      roleId === 3 ||
      (roleId === 5 &&
        ['schools', 'dashboard', 'knowroos', 'adventure'].some((substring) =>
          path.includes(substring)
        ))
    ) {
      return true;
    }
    return false;
  };

  const handleClick = (name, path) => {
    if (path === '') {
      navigate(path);
    } else {
      setOpenSubMenus((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }

    switch (name) {
      case 'Add School':
        setModalContent(<AddSchools CloseModal={handleCloseModal} />);
        setOpenModal(true);
        break;
      case 'Add Mobs':
        setModalContent(<AddMobs CloseModal={handleCloseModal} />);
        setOpenModal(true);
        break;
      case 'Add Adventure':
        setModalContent(<AddAdventure CloseModal={handleCloseModal} />);
        setOpenModal(true);
        break;
      case 'Add Leaps':
        setModalContent(<AddLeaps CloseModal={handleCloseModal} />);
        setOpenModal(true);
        break;
      case 'Add User':
        setModalContent(<AddUser CloseModal={handleCloseModal} />);
        setOpenModal(true);
        break;
      default:
        setOpenModal(false);
        break;
    }
  };

  const iconMapper = (name, selected) => {
    switch (name) {
      case 'My Territory':
        return <DashboardIcon selected={selected} />;
      case 'Schools/Company':
        return <SchoolIcon selected={selected} />;
      case 'Mobs':
        return <MobsIcon selected={selected} />;
      case 'Adventures':
        return <AdvanctureIcon selected={selected} />;
      case 'Leaps':
        return <LeapsIcon selected={selected} />;
      case 'Knowroos':
        return <UserIcon selected={selected} />;
      case 'Signout':
        return <SignoutIcon selected={selected} />;
      default:
        return <AddNew selected={selected} />;
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.protected && !authToken) return null;
      // Hide the "Schools/Company" and "Knowroos" items for role_id 3

      if (isTabHide(item.path)) return null;

      // if (roleId === 2 && (item.name === 'Schools/Company')) {
      //   return null;
      // }
      // if (roleId === 3 && (item.name === 'Schools/Company' || item.name === 'Knowroos') || (item.name === 'Adventures')) {
      //   return null;
      // }

      if (item.name !== 'Login' && item.name !== 'Forgot' && item.name !== 'ChangePasswrod') {
        const selected = location.pathname === item.path;
        if (item.name === 'Signout') {
          return (
            <React.Fragment key={item.name}>
              <ListItem
                button
                onClick={handleSignoutClick}
                selected={selected}
                sx={{
                  marginRight: '12px',
                  bgcolor: selected ? '#fff9f0' : 'transparent',
                  color: selected ? '#FFA500' : '#BFBFBF',
                  '&:hover': {
                    bgcolor: selected ? '#fff9f0' : 'action.hover',
                  },
                }}
              >
                <Tooltip title={isMinimized ? item.name : ''} placement="right" arrow>
                  <ListItemIcon
                    sx={{
                      marginLeft: '8px',
                      color: selected ? '#FFA500' : 'inherit',
                    }}
                  >
                    {iconMapper(item.name, selected)}
                  </ListItemIcon>
                </Tooltip>
                {!isMinimized && (
                  <ListItemText
                    primary={item.name}
                    sx={{ marginLeft: isMinimized ? '-10px' : '0px', fontWeight: 'bold' }}
                  />
                )}
              </ListItem>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={item.name}>
            <ListItem
              button
              component={item.path ? Link : 'div'}
              to={item.path ? item.path : undefined}
              disabled={isTabDisable(item.path)}
              onClick={
                item.name !== 'Signout' ? () => handleClick(item.name, item.path) : undefined
              }
              selected={selected}
              sx={{
                marginRight: '12px',
                bgcolor: selected ? '#fff9f0' : 'transparent',
                color: selected ? '#FFA500' : '#BFBFBF',
                '&:hover': {
                  bgcolor: selected ? '#fff9f0' : 'action.hover',
                },
              }}
            >
              <Tooltip title={isMinimized ? item.name : ''} placement="right" arrow>
                <ListItemIcon
                  sx={{
                    marginLeft: '8px',
                    color: selected ? '#FFA500' : 'inherit',
                  }}
                >
                  {iconMapper(item.name, selected)}
                </ListItemIcon>
              </Tooltip>

              <ListItemText
                primary={item.name}
                sx={{ marginLeft: isMinimized ? '-10px' : '0px', fontWeight: 'bold' }}
              />
              {item.subMenu &&
                (openSubMenus[item.name] ? (
                  <ArrowOpenIcon />
                ) : (
                  <ArrowCloseIcon selected={selected} />
                ))}
            </ListItem>

            {item.subMenu && (
              <Collapse in={selected && openSubMenus[item.name]} timeout="auto" unmountOnExit>
                <List
                  sx={item.subMenu ? { paddingLeft: '3px' } : {}}
                  component="div"
                  disablePadding
                  style={{ color: '#FFA500', fontSize: '10px' }}
                >
                  {renderMenuItems(item.subMenu)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      }
    });
  };

  const drawerContent = (
    <div style={{ position: 'relative' }}>
      <DrawerHeader style={{ position: 'sticky', top: '0px', background: '#fff', zIndex: 222 }}>
        {isMinimized && !mobileOpen ? (
          <MinLogoImg src={MinLogo} alt="Logo" />
        ) : mobileOpen ? (
          <LogoImg src={Logo} alt="Logo" />
        ) : (
          <LogoImg src={Logo} alt="Logo" />
        )}

        <div style={{ flexGrow: 1 }} />
      </DrawerHeader>
      <Divider />
      <ScrollableContent>
        <List>{renderMenuItems(routes)}</List>
      </ScrollableContent>
    </div>
  );

  return (
    <nav aria-label="sidebar navigation">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 220,
            padding: ' 0px 10px',
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isMinimized ? 70 : 220,
            padding: ' 0px 10px',
            transition: 'width 0.6s',
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <ModalOpen AddContent={modalContent} CloseModal={handleCloseModal} OpenModal={openModal} />
      <AlertModal
        open={openConfirmDialog}
        title="Confirm Signout"
        message="Are you sure you want to sign out?"
        onClose={handleCancelSignout}
        onConfirm={handleConfirmSignout}
        confirmText="Yes, Do it"
        cancelText="No, Cancel"
        // loading={deleteLoading}
      />
    </nav>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  setMobileOpen: PropTypes.func,
  isMinimized: PropTypes.bool.isRequired,
};

export default Sidebar;
