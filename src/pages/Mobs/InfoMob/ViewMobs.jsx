// src/components/ViewMobs/ViewMobs.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Divider, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import {
  Container,
  ThumbnailContainer,
  Thumbnail,
  Logo,
  GrayContainer,
  Label,
  Value,
} from './Style';
import infoIcon from '../../../assets/CardsIcon/info.svg';
import CloseIcon from '../../../assets/CardsIcon/closeBlack.svg';
import MobsData from './MobsData';
import { fetchViewMobs } from '../../../redux/slices/ViewMobs';
import { Img_BASE_URL } from '../../../config/apiConfig';
// import { fetchViewMobs } from '../../redux/slices/viewMobsSlice';

const ViewMobs = ({ id, CloseModal }) => {
  const dispatch = useDispatch();
  const { viewMobs, loading, error } = useSelector((state) => state.viewMobs);
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  useEffect(() => {
    dispatch(fetchViewMobs(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!viewMobs) {
    return null;
  }

  return (
    <Container>
      {/* <Typography textAlign="center" variant="h4" gutterBottom>
        <img src={infoIcon} alt="Info Icon" /> Info
      </Typography> */}
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: IsMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '1%',
          right: '1%',
        }}
      />
      <ThumbnailContainer>
        <Thumbnail src={`${Img_BASE_URL}/${viewMobs.group.thumbnail}`} alt="Thumbnail" />
      </ThumbnailContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1">Name</Label>
          <GrayContainer>
            <Value variant="body1">{viewMobs.group.name}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1">Description</Label>
          <GrayContainer>
            <Value variant="body1">{viewMobs.group.description}</Value>
          </GrayContainer>
        </Grid>
      </Grid>
      {/* Mob Data Component */}
      <MobsData data1={viewMobs} />
    </Container>
  );
};

ViewMobs.propTypes = {
  id: PropTypes.number.isRequired,
  CloseModal: PropTypes.func.isRequired,
};

export default ViewMobs;
