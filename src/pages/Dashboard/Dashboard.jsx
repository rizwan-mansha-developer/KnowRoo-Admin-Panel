import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdvantureCard from '../../components/Card/Advanture';
import LeapsCard from '../../components/Card/LeapsCard';
import MobsCard from '../../components/Card/Mobs';
import AdminLayout from '../../layouts/AdminLayout';
import { Button, Grid, Typography } from '@mui/material';
import { padding, textAlign } from '@mui/system';
import Cardimg from '../../assets/images/mobs.png';
import Leapsimg from '../../assets/images/mobs.png';
import profile from '../../assets/profile.svg';

const Dashboard = () => {
  const MobsName = 'Brain Trust';
  const MobsDetails =
    'The institute boasts a diverse faculty comprising renowned scholars, experts, and professionals.';
  const AdvantureName = 'Entrepreneurship in the Digital Age';
  const classe = '12 classes';

  const [isHoveredMobs, setIsHoveredMobs] = useState(false);
  const [isHoveredAdventure, setIsHoveredAdventure] = useState(false);
  const [isHoveredLeaps, setIsHoveredLeaps] = useState(false);
  // State to hold the number of cards to render based on screen width
  const [cardsToShow, setCardsToShow] = useState(3); // Default number of cards to show
  const navigate = useNavigate();
  // Define breakpoints for different screen sizes
  const breakpoints = {
    xs: 0, // Extra small devices (phones)
    sm: 600, // Small devices (portrait tablets)
    md: 960, // Medium devices (landscape tablets)
    lg: 1280, // Large devices (small laptops)
    xl: 1920, // Extra large devices (laptops and desktops)
  };

  // Function to determine the number of cards based on screen width
  const calculateCardsToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= breakpoints.xl) {
      setCardsToShow(3);
    } else if (screenWidth >= breakpoints.lg) {
      setCardsToShow(3);
    } else if (screenWidth >= breakpoints.md) {
      setCardsToShow(3);
    } else if (screenWidth <= breakpoints.sm) {
      setCardsToShow(1);
    } else {
      setCardsToShow(1);
    }
  };

  // Calculate initial number of cards to show on component mount
  useEffect(() => {
    calculateCardsToShow();
    // Update number of cards on window resize
    window.addEventListener('resize', calculateCardsToShow);
    return () => {
      window.removeEventListener('resize', calculateCardsToShow);
    };
  }, []);

  // Function to generate button styles based on hover state
  const buttonStyles = (isHovered, defaultColor, hoverColor, shadowColor, textColor) => ({
    fontSize: '20px',
    padding: '2px',
    fontWeight: 'bold',
    height: '40px',
    width: '130px',
    textAlign: 'center',
    borderRadius: '10px',
    color: textColor,
    backgroundColor: isHovered ? hoverColor : defaultColor,
    transition: 'background-color 0.3s ease',
    boxShadow: isHovered ? `0 2px ${shadowColor}` : 'none',
  });

  // Function to render Mobs cards
  const renderMobsCards = () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[...Array(cardsToShow)].map((_, index) => (
        <MobsCard
          key={index}
          img={Cardimg}
          MobsName={MobsName}
          MobsDetails={MobsDetails}
          avatars={[profile, profile, profile, profile]}
        />
      ))}
    </div>
  );

  // Function to render Adventure cards
  const renderAdvantureCards = () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[...Array(cardsToShow)].map((_, index) => (
        <AdvantureCard
          key={index}
          AdvantureName={AdvantureName}
          AdvantureDetails={MobsDetails}
          Classes={classe}
          avatars={[profile, profile, profile, profile]}
        />
      ))}
    </div>
  );

  // Function to render Leaps cards
  const renderLeapsCards = () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[...Array(cardsToShow)].map((_, index) => (
        <LeapsCard
          img={Leapsimg}
          key={index}
          LeapsName={AdvantureName}
          LeapsDetails={MobsDetails}
          avatars={[profile, profile, profile, profile]}
        />
      ))}
    </div>
  );

  const handleMobsClick = () => {
    navigate('/mobs'); // Replace with your desired route
  };

  const handleAdventureClick = () => {
    navigate('/adventures'); // Replace with your desired route
  };
  const handleLeapsClick = () => {
    navigate('/leaps'); // Replace with your desired route
  };

  return (
    <AdminLayout>
      {/* Header for Mobs section */}
      <Grid
        container
        style={{
          // marginTop: '5px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          style={buttonStyles(isHoveredMobs, '#f1dfbe', '#f1dfbe', 'FF9800', '#FF9800')}
          onMouseEnter={() => setIsHoveredMobs(true)}
          onMouseLeave={() => setIsHoveredMobs(false)}
        >
          Mobs
        </Typography>
        <Button
          onClick={handleMobsClick}
          style={{ color: '#FF9800', fontSize: '14px', fontWeight: 'bold', background: 'none' }}
        >
          See all
        </Button>
      </Grid>
      {renderMobsCards()}

      {/* Header for Adventure section */}
      <Grid
        container
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          style={buttonStyles(isHoveredAdventure, '#d6e6ee', '#d6e6ee', '008AC8', '#03A9F4')}
          onMouseEnter={() => setIsHoveredAdventure(true)}
          onMouseLeave={() => setIsHoveredAdventure(false)}
        >
          Adventure
        </Button>
        <Button
          onClick={handleAdventureClick}
          style={{ color: '#03A9F4', fontSize: '14px', fontWeight: 'bold', background: 'none' }}
        >
          See all
        </Button>
      </Grid>
      {renderAdvantureCards()}
      <Grid
        container
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          style={buttonStyles(isHoveredLeaps, '#dee7dd', '#dee7dd', '297F2C', '#4EB052')}
          onMouseEnter={() => setIsHoveredLeaps(true)}
          onMouseLeave={() => setIsHoveredLeaps(false)}
        >
          Leaps
        </Button>
        <Button
          onClick={handleLeapsClick}
          style={{ color: '#4EB052', fontSize: '14px', fontWeight: 'bold', background: 'none' }}
        >
          See all
        </Button>
      </Grid>
      {renderLeapsCards()}
    </AdminLayout>
  );
};

export default Dashboard;
