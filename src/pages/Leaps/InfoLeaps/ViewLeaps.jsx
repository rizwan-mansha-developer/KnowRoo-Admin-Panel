import React from 'react';
import { Typography, Box, Divider, Grid } from '@mui/material';
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
import thumbnailpic from '../../../assets/images/mobs.png';
import infoIcon from '../../../assets/CardsIcon/info.svg';
import CloseIcon from '../../../assets/CardsIcon/closeBlack.svg';

const ViewLeaps = ({ formData, thumbnail, logo, CloseModal }) => {
  return (
    <Container>
      <Typography textAlign="center" variant="h4" gutterBottom>
        <img src={infoIcon} /> {formData.title}
      </Typography>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{ width: '25px', cursor: 'pointer', position: 'absolute', top: '1%', right: '1%' }}
      />

      <ThumbnailContainer>
        <Thumbnail src={thumbnailpic} alt="Thumbnail" />
      </ThumbnailContainer>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1">Name</Label>
          <GrayContainer>
            <Value variant="body1">{formData.name}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1">Prerequisite</Label>
          <GrayContainer>
            <Value variant="body1">{formData.prerequisite}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1">Class Capacity</Label>
          <GrayContainer>
            <Value variant="body1">{formData.classCapacity}</Value>
          </GrayContainer>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Label variant="subtitle1">Description</Label>
          <GrayContainer>
            <Value variant="body1">{formData.description}</Value>
          </GrayContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

ViewLeaps.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    prerequisite: PropTypes.string,
    classCapacity: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  CloseModal: PropTypes.bool,
  thumbnail: PropTypes.string,
  logo: PropTypes.string,
};

export default ViewLeaps;
