import React from 'react';
import { Card, CardContent, CardMedia, Skeleton, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
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
const SkeletonCard = () => {
  return (
    <StyledCard style={{ borderRadius: '12px' }}>
      <Skeleton variant="rectangular" height={100} style={{ borderRadius: '12px' }} />
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="80%" />
        <Skeleton width="40%" />
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          mt={2}
          style={{ borderRadius: '35px' }}
        >
          {[...Array(4)].map((_, index) => (
            <Grid item key={index} style={{ borderRadius: '35px' }}>
              <Skeleton variant="circular" width={45} height={30} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default SkeletonCard;
