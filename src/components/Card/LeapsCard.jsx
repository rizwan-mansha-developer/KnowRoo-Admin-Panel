import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LeapsInfo from '../../pages/Leaps/InfoLeaps/Index';
import SchoolsInfo from '../../pages/Schools/InfoSchools/Index';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Grid,
  useMediaQuery,
  MenuItem,
} from '@mui/material';
import { height, padding } from '@mui/system';
import Active from '../../assets/CardsIcon/Active.svg';
import DeleteIcon from '../../assets/CardsIcon/delete.svg';
import AssignICon from '../../assets/CardsIcon/assignrole.svg';
import LBIcon from '../../assets/CardsIcon/LeadBicon.svg';
import BurgerIcon from '../../assets/CardsIcon/CardMenu.svg';
import Inactive from '../../assets/CardsIcon/Inactive (1).svg';
import LockIcon from '../../assets/CardsIcon/lock.svg';
import ViewIcon from '../../assets/CardsIcon/View.svg';
import { deleteLeaps } from '../../redux/deleteSlices/LeapsDeleteSlice';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import { DrawerHeader } from '../Sidebar/style';
import CardButtonIcon from '../Svg/CardButtonIcon';
import Cookies from 'js-cookie';
import AssignTA from '../Form/Assign Role/AssignTA';
import AssignTeacher from '../Form/Assign Role/AssignTeacher';
import MobsLeaderBoard from '../../redux/slices/MobsLeaderBoard';
import LeapsLeaderBoard from './../LeaderBoard/LeapsLeaderBoard/index';

// Character limit constants
const CHARACTER_LIMIT = 80;
const NAME_CHARACTER_LIMIT = 25;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || ''; // Ensure it returns an empty string if text is undefined or null
};
// Styled components
const StyledCard = styled(Card)`
  width: 100%;
  @media (min-width: 600px) {
    max-width: 285px;
  }
  @media (min-width: 700px) {
    max-width: 307px;
  }
  @media (min-width: 800px) {
    max-width: 365px;
  }
  @media (min-width: 850px) {
    max-width: 380px;
  }
  @media (min-width: 900px) {
    max-width: 415px;
  }
  @media (min-width: 960px) {
    max-width: 315px;
  }
  @media (min-width: 1000px) {
    max-width: 345px;
  }
  //125%
  @media (min-width: 1050px) {
    max-width: 392px;
  }
  @media (min-width: 1100px) {
    max-width: 385px;
  }
  @media (min-width: 1150px) {
    max-width: 415px;
  }
  //110%
  @media (min-width: 1200px) {
    max-width: 305px;
  }
  @media (min-width: 1250px) {
    max-width: 305px;
  }
  @media (min-width: 1300px) {
    max-width: 325px;
  }

  //100%
  @media (min-width: 1350px) {
    max-width: 347px;
  }

  @media (min-width: 1400px) {
    max-width: 352px;
  }
  @media (min-width: 1450px) {
    max-width: 362px;
  }
  @media (min-width: 1500px) {
    max-width: 390px;
  }
  //90%
  @media (min-width: 1500px) {
    max-width: 395px;
  }
  @media (min-width: 1600px) {
    max-width: 337px;
  }
  //80%
  @media (min-width: 1700px) {
    max-width: 337px;
  }
  //75%
  @media (min-width: 1800px) {
    max-width: 365px;
  }
  @media (min-width: 1900px) {
    max-width: 420px;
  }
  position: relative;
  &:hover .delete-icon-button {
    display: block;
  }
`;

const StyledCardMedia = styled.img`
  height: 140px;
  width: auto;
  border-radius: 12px;
  margin: 12px;
`;

const FullWidthButton = styled(Button)`
  width: auto;
  margin-top: 1px;
`;

const ActiveButtonContainer = styled(Box)({
  marginTop: '12px',
});

const AvatarGroupContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

const OverlappingAvatar = styled(Avatar)`
  border: 2px solid white;
  margin-left: -8px;
  width: 10px;
  height: 10px;
`;

const RemainingAvatar = styled(Avatar)`
  border: 2px solid white;
  margin-left: -8px;
  width: 12px;
  height: 12px;
`;

const MenuIcon = styled(Grid)`
  position: absolute;
  top: 3%;
  right: 3%;
  cursor: pointer;
  display: none;

  ${StyledCard}:hover & {
    display: block;
  }

  img {
    width: 34px;
    height: 34px;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;
const MenuBox = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1100;
  padding: 10px;
  border: 1px solid #4caf50;
`;

const LeapsCard = ({ prerequisite, id, img, LeapsName, LeapsDetails, statusUpdated, avatars }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignRoleDialog, setIsAssignRoleDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:1080px)');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteLoading, deleteStatus } = useSelector((state) => state.deleteLeaps);
  const CHARACTER_LIMIT = isSmallScreen ? 20 : isMediumScreen ? 50 : isLargeScreen ? 60 : 100;
  const NAME_CHARACTER_LIMIT = isSmallScreen ? 15 : isMediumScreen ? 30 : isLargeScreen ? 40 : 25;

  const buttonStyles = {
    // fontSize: "12px",
    width: '100%',
    fontSize: '13px',
    fontWeight: 'bold',
    height: '10px',
    border: '1.5px solid #FFA500',
    borderRadius: '10px',
    color: isHovered ? '#fff' : '#FFA500',
    backgroundColor: isHovered ? '#FFA500' : 'transparent',
    transition: 'background-color 0.3s ease',
    padding: '1px 30px',
    boxShadow: isHovered ? '0 4px #D46F1E' : 'none',
    marginTop: '20px',
  };
  const handleButtonClick = () => {
    navigate('/mobs/adventures/leaps/hops', { state: { id } });
    Cookies.set('leaps_Id', id, { expires: 7 });
  };
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleViewDetails = () => {
    console.log('View Details Clicked');
    setIsDialogOpen(true);
  };

  const handleAssignRole = () => {
    setIsAssignRoleDialog(true);
  };

  const handleCloseAssignRole = () => {
    setIsAssignRoleDialog(false);
  };

  const handleDelete = () => {
    setSelectedCardId(id);
    setIsMenuOpen(false);
    setIsAlertOpen(true);
  };
  const hanldeOpenLeaderBoard = () => {
    setOpenLeaderBoard(true);
  };
  const handleCloseLeaderBoard = () => {
    setOpenLeaderBoard(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteLeaps(selectedCardId));
  };

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      handleCloseAlert();
    }
  }, [deleteStatus]);

  return (
    <StyledCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
    >
      <StyledCardMedia src={img} />
      <Grid>
        <CardContent>
          <Typography
            component="div"
            style={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '0px', color: '#161736' }}
          >
            {truncateText(LeapsName, NAME_CHARACTER_LIMIT)}
          </Typography>
          {isHovered && (
            <MenuIcon className="delete-icon-button">
              <img src={BurgerIcon} alt="delete icon" onClick={handleMenuToggle} />
              {isMenuOpen && (
                <MenuBox>
                  {/*Leader Board */}
                  <MenuItem
                    onClick={hanldeOpenLeaderBoard}
                    sx={{
                      color: '#FF9800',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#fcf0db',
                        color: '#FF9800',
                      },
                      '&.Mui-selected': {
                        // backgroundColor: '#fffaf2',
                        color: '#FF9800',
                      },
                    }}
                  >
                    <img
                      src={LBIcon}
                      style={{ marginRight: '8px', width: '20px' }}
                      alt="Assign Role"
                    />{' '}
                    LeaderBoard
                  </MenuItem>
                  {/*Assign Role */}
                  {/* <MenuItem
                    onClick={handleAssignRole}
                    sx={{
                      color: '#616161',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        color: '#616161',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#f0f0f0',
                        color: '#616161',
                      },
                    }}
                  >
                    <img
                      src={AssignICon}
                      style={{ marginRight: '8px', width: '20px' }}
                      alt="Assign Role"
                    />{' '}
                    Assign Role
                  </MenuItem> */}
                  {/* Delete */}
                  <MenuItem
                    onClick={handleDelete}
                    sx={{
                      color: '#E71D36',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#ffebee',
                        color: '#E71D36',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ffebee',
                        color: '#E71D36',
                      },
                    }}
                  >
                    <img
                      src={DeleteIcon}
                      style={{ marginRight: '8px', width: '20px' }}
                      alt="Delete"
                    />{' '}
                    Delete
                  </MenuItem>
                </MenuBox>
              )}
            </MenuIcon>
          )}
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ color: '#A3B2BB', fontSize: '12px' }}
          >
            {truncateText(LeapsDetails, CHARACTER_LIMIT)}
          </Typography>
          <DrawerHeader />
          <Grid container alignItems="center">
            <ActiveButtonContainer>
              {statusUpdated ? (
                <img src={Active} alt="active icon" />
              ) : (
                <img src={Inactive} alt="inactive icon" />
              )}
            </ActiveButtonContainer>
            {prerequisite === 'Required' && (
              <img
                style={{ marginLeft: '12px', marginTop: '2px' }}
                src={LockIcon}
                alt="lock icon"
              />
            )}
          </Grid>

          <FullWidthButton
            style={buttonStyles}
            onClick={handleButtonClick}
            endIcon={<CardButtonIcon selected={isHovered} />}
          >
            Hops
          </FullWidthButton>
        </CardContent>
      </Grid>
      {/* Open Leader Board */}
      <ModalOpen
        AddContent={<LeapsLeaderBoard id={id} CloseModal={handleCloseLeaderBoard} />}
        OpenModal={openLeaderBoard}
        CloseModal={handleCloseLeaderBoard}
      />

      <ModalOpen
        AddContent={<AssignTA id={id} CloseModal={handleCloseAssignRole} />}
        OpenModal={isAssignRoleDialog}
        CloseModal={handleCloseAssignRole}
      />

      <AlertModal
        open={isAlertOpen}
        title="Confirm Action"
        message="Are you sure you want to Delete this Leap?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        confirmText="Yes, Do it"
        cancelText="No, Cancel"
        loading={deleteLoading}
      />
    </StyledCard>
  );
};
LeapsCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  LeapsName: PropTypes.string.isRequired,
  LeapsDetails: PropTypes.string.isRequired,
  statusUpdated: PropTypes.bool.isRequired,
  prerequisite: PropTypes.string,
  avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LeapsCard;
