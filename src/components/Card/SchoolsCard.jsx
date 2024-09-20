import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import SchoolsInfo from '../../pages/Schools/InfoSchools/Index';
import ViewSchool from '../../pages/Schools/InfoSchools/ViewSchools';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import Active from '../../assets/CardsIcon/Active.svg';
import DeleteIcon from '../../assets/CardsIcon/delete.svg';

import CardLogoIcon from '../../assets/CardsIcon/cardLogo.svg';
import CardMenuIcon from '../../assets/CardsIcon/CardMenu.svg';
import Inactive from '../../assets/CardsIcon/Inactive (1).svg';
import ViewIcon from '../../assets/CardsIcon/View.svg';
import { deleteSchool } from '../../redux/deleteSlices/SchoolDeleteSlice';
import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import ArrowIcon from '../Svg/ArrowIconButton';
import { fontWeight } from '@mui/system';

// Character limit constant
const CHARACTER_LIMIT = 80;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text;
};

// Styled components with media queries
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
  margin: 12px;
  border-radius: 12px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const ActiveButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '10px -2px',
});

const MenuIcon = styled(Grid)`
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

const LogoIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  bottom: 55%;
  left: 5%;
  cursor: pointer;
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

const SchoolsCard = ({ id, img, schoolName, schoolDetails, CurrentStatus, logo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteLoading, deleteError, deleteStatus } = useSelector((state) => state.schoolsDelete);

  const buttonStyles = {
    fontSize: '15px',
    border: '1.5px solid #FFA500',
    fontWeight: 'bold',
    borderRadius: '10px',
    color: isHovered ? '#fff' : '#FFA500',
    backgroundColor: isHovered ? '#FFA500' : 'transparent',
    transition: 'background-color 0.3s ease',
    padding: '10px 20px',
    boxShadow: isHovered ? '0 4px #D46F1E' : 'none',
  };

  const handleButtonClick = () => {
    // navigate('/mobs/adventures/leaps', { state: { id, AdvantureName } });
    navigate('/mobs', { state: { id } });
    Cookies.set('schoolId', id, { expires: 7 });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleViewDetails = () => {
    console.log('View Details Clicked');
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    setSelectedCardId(id);
    setIsMenuOpen(false);
    setIsAlertOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteSchool(selectedCardId));
    if (deleteStatus === 'succeeded') {
      handleCloseAlert();
    }
  };

  return (
    <>
      <StyledCard
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsMenuOpen(false);
        }}
      >
        <MenuIcon className="menu-icon">
          <img src={CardMenuIcon} alt="menu icon" onClick={handleMenuToggle} />
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
        </MenuIcon>
        <LogoIcon src={logo} />
        <StyledCardMedia src={img} />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ fontWeight: 'bold', marginLeft: '0px' }}
          >
            {schoolName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              height: '50px',
              color: '#8C97AA',
              fontSize: '13px',
              marginLeft: '0px',
              fontWeight: 400,
            }}
          >
            {truncateText(schoolDetails, CHARACTER_LIMIT)}
          </Typography>
          <ActiveButtonContainer>
            {CurrentStatus ? (
              <img src={Active} alt="active icon" />
            ) : (
              <img src={Inactive} alt="inactive icon" />
            )}
          </ActiveButtonContainer>
          <FullWidthButton
            fullWidth
            style={buttonStyles}
            endIcon={<ArrowIcon isHovered={isHovered} />}
            onClick={handleButtonClick}
          >
            Mobs
          </FullWidthButton>
        </CardContent>
      </StyledCard>

      {/* View Details Dialog */}
      <ModalOpen
        AddContent={<ViewSchool CloseModal={handleCloseDialog} schoolId={id} />}
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
    </>
  );
};

// PropTypes validation
SchoolsCard.propTypes = {
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  schoolName: PropTypes.string.isRequired,
  schoolDetails: PropTypes.string.isRequired,
  CurrentStatus: PropTypes.bool,
  logo: PropTypes.string,
};

export default SchoolsCard;
