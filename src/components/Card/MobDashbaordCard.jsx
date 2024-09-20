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
import submitIcon from '../../assets/CardsIcon/submiticon.svg';
import { deleteMobs } from '../../redux/deleteSlices/MobDeleteSlice';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import ViewMobs from '../../pages/Mobs/InfoMob/ViewMobs';
import CardButtonIcon from '../Svg/CardButtonIcon';

import AssignTeacher from '../Form/Assign Role/AssignTeacher';
import MobsLeaderBoard from '../LeaderBoard/MobsLeaderBoard';
import { bgcolor } from '@mui/system';

// Character limit constant
const CHARACTER_LIMIT = 80;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text && text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || ''; // Ensure it returns an empty string if text is undefined or null
};

const StyledCard = styled(Card)`
  width: 200px;
  position: relative;
  &:hover .menu-icon {
    display: block;
  }
`;

const StyledCardMedia = styled.img`
  height: 50px;
  width: 50px;
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
  width: 10px;
  height: 10px;
`;

const RemainingAvatar = styled(Avatar)`
  border: 2px solid white;
  margin-left: -8px;
  width: 22px;
  height: 22px;
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

const DashbaordMobsCard = ({ id, img, MobsName, MobsDetails, avatars, CurrentStatus }) => {
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
      style={{ backgroundColor: '#f8f8fd' }}
    >
      <Box display={'flex'} gap={2} justifyContent={'space-between'}>
        <StyledCardMedia src={img} />
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
      </Box>

      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: 'bold', marginLeft: '0px' }}
          >
            {MobsName}
          </Typography>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ color: '#8C9FAA', fontSize: '14px' }}
        >
          {truncateText(MobsDetails, CHARACTER_LIMIT)}
        </Typography>

        <Grid container justifyContent="space-between" alignItems="center">
          <ActiveButtonContainer>
            {CurrentStatus ? (
              <img src={Active} alt="active icon" />
            ) : (
              <img src={Inactive} alt="inactive icon" />
            )}
          </ActiveButtonContainer>
          <img src={submitIcon} onClick={handleButtonClick} />
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

DashbaordMobsCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  MobsName: PropTypes.string.isRequired,
  MobsDetails: PropTypes.string.isRequired,
  avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
  CurrentStatus: PropTypes.bool.isRequired,
};

export default DashbaordMobsCard;
