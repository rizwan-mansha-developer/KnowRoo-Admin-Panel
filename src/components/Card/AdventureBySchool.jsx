import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SchoolsInfo from '../../pages/Schools/InfoSchools/Index';
import { Card, CardContent, Typography, Button, Box, Grid, Divider, MenuItem } from '@mui/material';
import Active from '../../assets/CardsIcon/Active.svg';
import BurgerIcon from '../../assets/CardsIcon/CardMenu.svg';
import DeleteIcon from '../../assets/CardsIcon/delete.svg';
import Inactive from '../../assets/CardsIcon/Inactive (1).svg';
import ViewIcon from '../../assets/CardsIcon/View.svg';
import { deleteAdventure } from '../../redux/deleteSlices/AdventureDeleteSlice';
import Cookies from 'js-cookie';

import AlertModal from '../Modal/AlertModal';
import ModalOpen from '../Modal/Modal';
import ArrowIconBtn from '../Svg/ArrowIconBtn';

// Character limit constant
const CHARACTER_LIMIT = 90;

// Utility function to truncate text
const truncateText = (text, limit) => {
  if (text?.length > limit) {
    return text.substring(0, limit) + '...';
  }
  return text || '';
};

// Arrays of colors for random selection
const BGCOLORS = ['#fff9f0', '#f4faf4', '#e6f7fe'];
const COLORS = ['#FF9800', '#4CAF50', '#03A9F4'];

// Utility function to get a random index
const getRandomIndex = () => Math.floor(Math.random() * BGCOLORS.length);

// Styled components
const StyledCard = styled(Card)`
  width: 100%;
  padding: 10px 3px;
  padding-bottom: 0px;
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

const FullWidthButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const ActiveButtonContainer = styled(Box)({
  marginTop: '5px',
});

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
const StyledCardMedia = styled.img`
  height: 140px;
  width: auto;
  border-radius: 12px;
  margin: 12px;
`;

const AdvCardBySchool = ({ img, id, AdvantureName, AdvantureDetails, Classes, CurrentStatus }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deleteLoading, deleteStatus } = useSelector((state) => state.deleteAdventure);

  const randomIndex = getRandomIndex();
  const randomColor = COLORS[randomIndex];
  const randomBgColor = BGCOLORS[randomIndex];

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleViewDetails = () => {
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
    dispatch(deleteAdventure(selectedCardId));
  };

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      handleCloseAlert();
    }
  }, [deleteStatus]);

  const handleButtonClick = () => {
    navigate('/mobs/adventures/leaps', { state: { id } });
    Cookies.set('adv_Id', id, { expires: 7 });
  };

  const buttonStyles = {
    marginLeft: '50%',
    marginTop: '2%',
    width: '47%',
    fontSize: '15px',
    fontWeight: 'bold',
    border: '1.5px solid #FFA500',
    borderRadius: '10px',
    color: isHovered ? '#fff' : '#FFA500',
    backgroundColor: isHovered ? '#FFA500' : 'transparent',
    transition: 'background-color 0.3s ease',
    padding: '10px 20px',
    boxShadow: isHovered ? '0 4px #D46F1E' : 'none',
  };

  return (
    <StyledCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
    >
      {' '}
      <StyledCardMedia src={img} />
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '0px', color: randomColor }}
        >
          {AdvantureName}
        </Typography>
        {isHovered && (
          <MenuIcon className="delete-icon-button">
            <img src={BurgerIcon} alt="menu icon" onClick={handleMenuToggle} />
            {isMenuOpen && (
              <MenuBox>
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
        <Grid display="flex" gap={2}>
          <ActiveButtonContainer>
            {CurrentStatus ? (
              <img src={Active} alt="active icon" />
            ) : (
              <img src={Inactive} alt="inactive icon" />
            )}
          </ActiveButtonContainer>
        </Grid>
        <Divider />

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ color: '#8C9FAA', fontSize: '14px', marginLeft: '0px' }}
        >
          {truncateText(AdvantureDetails, CHARACTER_LIMIT)}
        </Typography>
        {/* <FullWidthButton
          style={buttonStyles}
          endIcon={<ArrowIconBtn isHovered={isHovered} />}
          onClick={handleButtonClick}
        >
          Leaps
        </FullWidthButton> */}
      </CardContent>
      {/* Modal for Viewing Details */}
      <ModalOpen
        AddContent={<SchoolsInfo CloseModal={handleCloseDialog} />}
        OpenModal={isDialogOpen}
        CloseModal={handleCloseDialog}
      />
      {/* Alert for Confirming Deletion */}
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

AdvCardBySchool.propTypes = {
  id: PropTypes.string.isRequired,
  AdvantureName: PropTypes.string.isRequired,
  AdvantureDetails: PropTypes.string.isRequired,
  Classes: PropTypes.string.isRequired,
  CurrentStatus: PropTypes.bool.isRequired,
};

export default AdvCardBySchool;
