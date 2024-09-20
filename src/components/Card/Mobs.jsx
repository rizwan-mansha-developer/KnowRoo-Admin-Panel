import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import SchoolsInfo from '../../pages/Schools/InfoSchools/Index';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Checkbox,
  Avatar,
  Grid,
  MenuItem,
} from '@mui/material';
import BUttonIcon from '../../assets/ArrowIcon.svg';
import Active from '../../assets/CardsIcon/Active.svg';
import BurgerIcon from '../../assets/CardsIcon/CardMenu.svg';
import DeleteIcon from '../../assets/CardsIcon/delete.svg';
import AssignICon from '../../assets/CardsIcon/assignrole.svg';
import Inactive from '../../assets/CardsIcon/Inactive (1).svg';
import LBIcon from '../../assets/CardsIcon/OpenLeaderBoard.svg';
import ViewIcon from '../../assets/CardsIcon/View.svg';
import { deleteMobs } from '../../redux/deleteSlices/MobDeleteSlice';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import ViewMobs from '../../pages/Mobs/InfoMob/ViewMobs';
import CardButtonIcon from '../Svg/CardButtonIcon';

import AssignTeacher from '../Form/Assign Role/AssignTeacher';
import MobsLeaderBoard from '../LeaderBoard/MobsLeaderBoard';

// Character limit constant
const CHARACTER_LIMIT = 80;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || ''; // Ensure it returns an empty string if text is undefined or null
};

// Styled components

// const StyledCard = styled(Card)`
//   // max-width: 345px;
//   width: 100%;
//   // margin: auto;
//   position: relative;

//   &:hover .delete-icon-button {
//     display: block;
//   }

//   // Media queries for responsiveness every 25px
//   @media (min-width: 600px) {
//     max-width: 285px;
//   }
//   @media (min-width: 625px) {
//     max-width: 295px;
//   }
//   @media (min-width: 650px) {
//     max-width: 305px;
//   }
//   @media (min-width: 675px) {
//     max-width: 315px;
//   }
//   @media (min-width: 700px) {
//     max-width: 325px;
//   }
//   @media (min-width: 725px) {
//     max-width: 335px;
//   }
//   @media (min-width: 750px) {
//     max-width: 345px;
//   }
//   @media (min-width: 775px) {
//     max-width: 350px; // Capped at 350px
//   }
//   @media (min-width: 800px) {
//     max-width: 350px;
//   }
//   @media (min-width: 825px) {
//     max-width: 350px;
//   }
//   @media (min-width: 850px) {
//     max-width: 350px;
//   }
//   @media (min-width: 875px) {
//     max-width: 350px;
//   }
//   @media (min-width: 900px) {
//     max-width: 350px;
//   }
//   // Continue the same pattern for higher screen widths
//   @media (min-width: 925px) {
//     max-width: 350px;
//   }
//   @media (min-width: 950px) {
//     max-width: 350px;
//   }
//   @media (min-width: 975px) {
//     max-width: 340px;
//   }
//   @media (min-width: 1000px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1025px) {
//     max-width: 370px;
//   }
//   @media (min-width: 1050px) {
//     max-width: 380px;
//   }
//   @media (min-width: 1075px) {
//     max-width: 390px;
//   }
//   @media (min-width: 1100px) {
//     max-width: 410px;
//   }
//   @media (min-width: 1125px) {
//     max-width: 415px;
//   }
//   @media (min-width: 1150px) {
//     max-width: 420px;
//   }
//   @media (min-width: 1175px) {
//     max-width: 430px;
//   }
//   @media (min-width: 1200px) {
//     max-width: 450px;
//   }
//   @media (min-width: 1225px) {
//     max-width: 300px;
//   }
//   @media (min-width: 1250px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1275px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1300px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1325px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1350px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1375px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1400px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1425px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1450px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1475px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1500px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1525px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1550px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1575px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1600px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1625px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1650px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1675px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1700px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1725px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1750px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1775px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1800px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1825px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1850px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1875px) {
//     max-width: 350px;
//   }
//   @media (min-width: 1900px) {
//     max-width: 350px;
//   }
// `;

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
  &:hover .menu-icon {
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
  margin-top: 16px;
`;

const ActiveButtonContainer = styled(Box)`
  margin-top: 6px;
`;

const CustomCheckbox = styled(Checkbox)`
  &.Mui-checked {
    border: none;
  }
`;

const AvatarGroupContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

const OverlappingAvatar = styled(Avatar)`
  border: 2px solid white;
  margin-left: -8px;
  width: 20px;
  height: 20px;
`;

const RemainingAvatar = styled(Avatar)`
  border: 2px solid white;
  margin-left: -8px;
  width: 32px;
  height: 32px;
`;

const Menu = styled(Grid)`
  position: absolute;
  top: 5%;
  right: 5%;
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

const MobsCard = ({ id, img, MobsName, MobsDetails, avatars, CurrentStatus }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignRoleDialog, setIsAssignRoleDialog] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteLoading, deleteStatus } = useSelector((state) => state.deleteMobs);

  const buttonStyles = {
    fontSize: '13px',
    fontWeight: 'bold',
    height: '10px',
    border: '1.5px solid #FFA500',
    borderRadius: '10px',
    color: isHovered ? '#fff' : '#FFA500',
    backgroundColor: isHovered ? '#FFA500' : 'transparent',
    transition: 'background-color 0.3s ease',
    boxShadow: isHovered ? '0 4px #D46F1E' : 'none',
    marginTop: '16px',
  };

  const handleButtonClick = () => {
    navigate('/mobs/adventures', { state: { id } });
    Cookies.set('mobs_Id', id, { expires: 7 });
  };
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleViewDetails = () => {
    setIsDialogOpen(true);
  };

  const handleAssignRole = () => {
    setIsAssignRoleDialog(true);
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
  const handleCloseAssignRole = () => {
    setIsAssignRoleDialog(false);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteMobs(selectedCardId));
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
      <Menu className="delete-icon-button">
        <img src={BurgerIcon} alt="delete icon" onClick={handleMenuToggle} />
        {isMenuOpen && (
          <MenuBox>
            {/*Assign Role */}
            <MenuItem
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
            </MenuItem>
            {/*View Detiles */}
            <MenuItem
              onClick={handleViewDetails}
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
                src={ViewIcon}
                style={{ marginRight: '8px', width: '20px' }}
                alt="View Details"
              />{' '}
              View Details
            </MenuItem>
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
              <img src={DeleteIcon} style={{ marginRight: '8px', width: '20px' }} alt="Delete" />{' '}
              Delete
            </MenuItem>
          </MenuBox>
        )}
      </Menu>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            component="div"
            style={{ fontWeight: 'bold', marginLeft: '0px' }}
          >
            {MobsName}
          </Typography>
          <img onClick={hanldeOpenLeaderBoard} src={LBIcon} alt="leaderboard icon" />
        </Grid>
        <ActiveButtonContainer>
          {CurrentStatus ? (
            <img src={Active} alt="active icon" />
          ) : (
            <img src={Inactive} alt="inactive icon" />
          )}
        </ActiveButtonContainer>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ height: '50px', color: '#8C9FAA', fontSize: '14px' }}
        >
          {truncateText(MobsDetails, CHARACTER_LIMIT)}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <AvatarGroupContainer>
            {avatars?.slice(0, 2)?.map((avatar, index) => (
              <OverlappingAvatar key={index} src={avatar} alt={`avatar ${index}`} />
            ))}
            {avatars?.length > 2 && (
              <RemainingAvatar style={{ background: '#EBF9FF', color: '#03A9F4' }}>
                +{avatars.length - 2}
              </RemainingAvatar>
            )}
          </AvatarGroupContainer>
          <FullWidthButton
            style={buttonStyles}
            onClick={handleButtonClick}
            endIcon={<CardButtonIcon selected={isHovered} />}
          >
            Adventures
          </FullWidthButton>
        </Grid>
      </CardContent>
      {/* View Details Dialog */}
      <ModalOpen
        AddContent={<AssignTeacher id={id} CloseModal={handleCloseAssignRole} />}
        OpenModal={isAssignRoleDialog}
        CloseModal={handleCloseAssignRole}
      />
      {/* Open Leader Board */}
      <ModalOpen
        AddContent={<MobsLeaderBoard id={id} CloseModal={handleCloseLeaderBoard} />}
        OpenModal={openLeaderBoard}
        CloseModal={handleCloseLeaderBoard}
      />

      {/* Assign Role Dialog */}
      <ModalOpen
        AddContent={<ViewMobs id={id} CloseModal={handleCloseDialog} />}
        OpenModal={isDialogOpen}
        CloseModal={handleCloseDialog}
      />

      {/* Delete Alert Dialog */}
      <AlertModal
        open={isAlertOpen}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        onClose={handleCloseAlert}
        onConfirm={handleConfirmDelete}
        confirmText="Yes, Do it"
        cancelText="No, Cancel"
        loading={deleteLoading}
      />
    </StyledCard>
  );
};

MobsCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  MobsName: PropTypes.string.isRequired,
  MobsDetails: PropTypes.string.isRequired,
  avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
  CurrentStatus: PropTypes.bool.isRequired,
};

export default MobsCard;
