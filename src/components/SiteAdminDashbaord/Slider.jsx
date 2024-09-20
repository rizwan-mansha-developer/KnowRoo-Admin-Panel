// SliderComponent.js
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Img_BASE_URL } from '../../config/apiConfig';
import SchoolsCard from '../Card/SchoolsCard';
import { Avatar, Typography } from '@mui/material';
import { Box, display } from '@mui/system';
import { textAlign } from '@mui/system';
import DashbaordSchoolCard from '../Card/DashbaordSchoolCard';

// Define a styled component for the slider container
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// Define a styled component for the slider items
const SlideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   padding: 20px;
  //   background-color: #fff;
  border-radius: 8px;
  //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
  //   text-align: center;
`;

// Define a styled component for the list inside the slider item
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100vh;
  overflow: auto;

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
  display: flex;
  //   align-items: center;
  //   justify-content: center;
`;

const ItemText = styled.span`
  font-size: 16px;
  color: #333;
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SchoolName = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const SchoolDescription = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const SliderComponent = ({ schools }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true, // Show dots for navigation
    arrows: false, // Hide navigation arrows
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Change slide every 3 seconds (3000 ms)
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {schools?.map((school) => (
          <SlideItem key={school.id}>
            <DashbaordSchoolCard
              key={school.id}
              id={school.id}
              img={`${Img_BASE_URL}/${school.thumbnail}`}
              schoolName={school.name}
              schoolDetails={school.description}
              CurrentStatus={school.status}
            />
            <ListContainer>
              {school.activities.map((activity, index) => (
                <ListItem key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Box style={{ display: 'flex' }}>
                    <Avatar src={`${Img_BASE_URL}/${activity.sender.profile_picture}`} />
                    <ItemText style={{ marginLeft: '8px' }}>{activity.sender.username}</ItemText>
                  </Box>
                  <Typography style={{ marginLeft: '48px', marginTop: '-20px', fontSize: '10px' }}>
                    {activity.message}
                  </Typography>
                </ListItem>
              ))}
            </ListContainer>
          </SlideItem>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default SliderComponent;
