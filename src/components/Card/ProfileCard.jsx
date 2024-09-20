import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UserViewPage from '../../pages/Profile/UserInfo/Index';
import ViewUser from '../../pages/Profile/UserInfo/ViewUsers';
import SchoolsInfo from '../../pages/Schools/InfoSchools/Index';
import MenuIcon from '@mui/icons-material/Menu';
import { CardContent, Typography, Box, Avatar, Card, MenuItem, Menu } from '@mui/material';
import BurgerIcon from '../../assets/CardsIcon/CardMenu.svg';
import DeleteIcon from '../../assets/CardsIcon/delete.svg';
import ViewIcon from '../../assets/CardsIcon/View.svg';
import { deleteUser } from '../../redux/deleteSlices/UserDeleteSlice';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';

// Character limit constant
const CHARACTER_LIMIT = 10;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text;
};

// Styled components
const StyledCard = styled(Card)`
  padding: 5px;
  padding-bottom: 15px;
  position: relative;
  &:hover .menu-icon {
    display: block;
  }
  width: 300px;
  // @media (min-width: 600px) {
  //   max-width: 285px;
  // }
  // @media (min-width: 700px) {
  //   max-width: 307px;
  // }
  // @media (min-width: 800px) {
  //   max-width: 365px;
  // }
  // @media (min-width: 850px) {
  //   max-width: 380px;
  // }
  // @media (min-width: 900px) {
  //   max-width: 415px;
  // }
  // @media (min-width: 960px) {
  //   max-width: 315px;
  // }
  // @media (min-width: 1000px) {
  //   max-width: 345px;
  // }
  // //125%
  // @media (min-width: 1050px) {
  //   max-width: 392px;
  // }
  // @media (min-width: 1100px) {
  //   max-width: 385px;
  // }
  // @media (min-width: 1150px) {
  //   max-width: 415px;
  // }
  // //110%
  // @media (min-width: 1200px) {
  //   max-width: 305px;
  // }
  // @media (min-width: 1250px) {
  //   max-width: 305px;
  // }
  // @media (min-width: 1300px) {
  //   max-width: 325px;
  // }

  // //100%
  // @media (min-width: 1350px) {
  //   max-width: 347px;
  // }

  // @media (min-width: 1400px) {
  //   max-width: 352px;
  // }
  // @media (min-width: 1450px) {
  //   max-width: 362px;
  // }
  // @media (min-width: 1500px) {
  //   max-width: 390px;
  // }
  // //90%
  // @media (min-width: 1500px) {
  //   max-width: 395px;
  // }
  // @media (min-width: 1600px) {
  //   max-width: 337px;
  // }
  // //80%
  // @media (min-width: 1700px) {
  //   max-width: 337px;
  // }
  // //75%
  // @media (min-width: 1800px) {
  //   max-width: 365px;
  // }
  // @media (min-width: 1900px) {
  //   max-width: 420px;
  // }

  @media (min-width: 600px) {
    max-width: 280px;
  }
  @media (min-width: 960px) {
    max-width: 325px;
  }
  @media (min-width: 1024px) {
    max-width: 345px;
  }
  @media (min-width: 1280px) {
    max-width: 290px;
  }
  @media (min-width: 1180px) {
    max-width: 295px;
  }
  @media (min-width: 1400px) {
    max-width: 290px;
  }
  position: relative;
  &:hover .delete-icon-button {
    display: block;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  margin: 10px auto;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  color: ${(props) => props.color || '#616161'};
  font-size: 10px;
  font-weight: bold;
  padding: 3px 10px;
  background-color: ${(props) => props.bgColor || '#f5f6f7'};
  border-radius: 8px;
  margin: 8px 0;
`;

const MenuContainer = styled(Box)`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  cursor: pointer;
`;

const MenuBox = styled(Box)`
  position: absolute;
  top: 40px;
  right: 10px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1100;
  padding: 10px;
`;

const ProfileCard = ({ profileImage, userName, id, userDesignation, phoneNumber, email }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const dispatch = useDispatch();
  const { deleteLoading, deleteStatus } = useSelector((state) => state.deleteUser);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleViewDetails = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(false);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    setSelectedCardId(id);
    setIsMenuOpen(false);
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };
  const handleConfirmDelete = () => {
    dispatch(deleteUser(selectedCardId));
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
      <CardContent>
        <StyledAvatar
          style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          src={profileImage}
        />
        <Typography color="#03A9F4" fontSize="24px" textAlign="center">
          {userName}
        </Typography>
        <Box display="flex" justifyContent="space-around" m={1} px={2.5}>
          <StyledTypography color="#FFA500" bgColor="#fff9f0" fontSize="14px">
            {userDesignation}
          </StyledTypography>
        </Box>
        <StyledTypography style={{ fontSize: '11px', fontWeight: 'bold' }} mx={2} my={1} mt={3}>
          {phoneNumber}
        </StyledTypography>
        <StyledTypography style={{ fontSize: '10px', fontWeight: 'bold' }} mx={2}>
          {email}
        </StyledTypography>
      </CardContent>
      <MenuContainer className="menu-icon">
        <img src={BurgerIcon} alt="menu-icon" onClick={handleMenuToggle} />
      </MenuContainer>
      {isMenuOpen && (
        <MenuBox>
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
            <img src={ViewIcon} style={{ marginRight: '8px', width: '20px' }} alt="View Details" />{' '}
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

      {/* View Details Dialog */}
      <ModalOpen
        AddContent={<ViewUser userId={id} CloseModal={handleCloseDialog} />}
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

ProfileCard.propTypes = {
  profileImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userDesignation: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileCard;
