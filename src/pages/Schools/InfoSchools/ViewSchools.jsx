import React, { useEffect } from 'react';
import { Typography, Box, Divider, Grid, useMediaQuery, CircularProgress } from '@mui/material';
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
import logoicon from '../../../assets/FormsIcon/WebsiteIcon.svg';
import thumbnailpic from '../../../assets/images/mobs.png';
import logoSrc from '../../../assets/FormsIcon/WebsiteIcon.svg';
import infoIcon from '../../../assets/CardsIcon/info.svg';
import CloseIcon from '../../../assets/CardsIcon/closeBlack.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchViewSchool } from '../../../redux/slices/ViewSchool';
import { Img_BASE_URL } from '../../../config/apiConfig';

const ViewSchool = ({ CloseModal, schoolId }) => {
  const dispatch = useDispatch();
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const { viewSchool, loading, error } = useSelector((state) => state.viewSchool);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchViewSchool(schoolId));
    }
  }, [dispatch, schoolId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load school information</Typography>;
  }

  if (!viewSchool) {
    return <Typography>No school data available</Typography>;
  }

  const formData = {
    title: 'Info',
    name: viewSchool.name,
    address: viewSchool.address,
    principal: viewSchool.principle,
    contactEmail: viewSchool.contact_info,
    establishmentYear: viewSchool.establishment_year,
    institutionType: viewSchool.Institution_type,
    description: viewSchool.description,
    websiteURL: viewSchool.website_url,
  };

  const thumbnail = { thumbnailpic: `${Img_BASE_URL}/${viewSchool.thumbnail}` };
  const logo = { logoicon: `${Img_BASE_URL}/${viewSchool.school_logo}` };

  return (
    <Container>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: IsMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'fixed',
          top: '1%',
          right: '1%',
        }}
      />

      <ThumbnailContainer>
        <Thumbnail src={thumbnail.thumbnailpic} alt="Thumbnail" />
        <Logo
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          src={logo.logoicon}
          alt="Logo"
        />
      </ThumbnailContainer>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Name
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.name}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Address
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.address}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Principal/CEO
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.principal}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Contact Info
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.contactEmail}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Establishment Year
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.establishmentYear}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Institution Type
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.institutionType}</Value>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Label variant="subtitle1" fontWeight={'600'}>
            Description
          </Label>
          <GrayContainer>
            <Value variant="body1">{formData.description}</Value>
          </GrayContainer>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Grid item xs={12} sm={6} style={{ textAlign: 'center', marginTop: '4px' }}>
          <Label variant="subtitle1" fontWeight={'600'}>
            <Box display="flex">
              <img src={logoicon} alt="Website Icon" />
              <Typography
                sx={{
                  textAlign: 'center',
                  ml: '20px',
                  fontSize: '16px',
                  fontWeight: '600',
                  mt: '4px',
                }}
              >
                WebSite
              </Typography>
            </Box>
          </Label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GrayContainer>
            <Value variant="body1">{formData.websiteURL}</Value>
          </GrayContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

ViewSchool.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    principal: PropTypes.string,
    contactEmail: PropTypes.string,
    establishmentYear: PropTypes.string,
    institutionType: PropTypes.string,
    description: PropTypes.string,
    websiteURL: PropTypes.string,
  }).isRequired,
  CloseModal: PropTypes.bool,
  thumbnail: PropTypes.string,
  logo: PropTypes.string,
};

export default ViewSchool;
