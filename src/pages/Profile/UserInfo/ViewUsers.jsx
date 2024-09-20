import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid, CircularProgress, useMediaQuery } from '@mui/material';
import { styled } from 'styled-components';
import infoIcon from '../../../assets/CardsIcon/info.svg';
import userPic from '../../../assets/images/user.jpg';
import CloseIcon from '../../../assets/CardsIcon/closeBlack.svg';
import { FormContainer, GrayContainer, UploadContainer, ImagePreview } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchViewUser } from '../../../redux/slices/ViewUser';
import { Img_BASE_URL } from '../../../config/apiConfig';

const ViewUser = ({ CloseModal, userId }) => {
  const dispatch = useDispatch();
  const { viewUser, loading, error } = useSelector((state) => state.viewUser);
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  useEffect(() => {
    if (userId) {
      dispatch(fetchViewUser(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Failed to load user information</Typography>;
  }

  if (!viewUser) {
    return <Typography>No user data available</Typography>;
  }

  const formData = {
    // title: 'Info',
    firstname: viewUser.fname,
    lastname: viewUser.lname,
    username: viewUser.username,
    email: viewUser.email,
    phone: viewUser.phone,
    gender: viewUser.gender,
    country: viewUser.country,
    dob: viewUser.dob,
    enrollmentDate: viewUser.enrollment_date,
    address: viewUser.address,
    role: viewUser.role?.name,
  };

  const ProfilePicture = `${Img_BASE_URL}/${viewUser.profile_picture}`;

  if (!formData) {
    return <Typography variant="body1">No data available</Typography>;
  }

  return (
    <FormContainer>
      <Typography textAlign="center" variant="h4" gutterBottom>
        {/* <img src={infoIcon} /> {formData.title} */}
        <img
          onClick={CloseModal}
          src={CloseIcon}
          alt="Close Icon"
          style={{
            width: IsMobile ? '25px' : '40px',
            cursor: 'pointer',
            position: 'absolute',
            top: '-1%',
            right: '1%',
          }}
        />
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} sm={3}>
          <UploadContainer>
            <ImagePreview src={ProfilePicture} alt="Profile Picture" />
          </UploadContainer>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                First Name
              </Typography>
              <GrayContainer>
                <Typography variant="body2">{formData.firstname} </Typography>
              </GrayContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Last Name
              </Typography>
              <GrayContainer>
                <Typography variant="body2">{formData.lastname}</Typography>
              </GrayContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Username
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.username}</Typography>
          </GrayContainer>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Email
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.email}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Phone
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.phone}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Gender
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.gender}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Country
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.country}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Date of Birth
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.dob}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Enrollment Date
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.enrollmentDate}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Address
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.address}</Typography>
          </GrayContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            Role
          </Typography>
          <GrayContainer>
            <Typography variant="body2">{formData.role}</Typography>
          </GrayContainer>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

ViewUser.propTypes = {
  formData: PropTypes.object,
  selectedProfilePicture: PropTypes.string,
  selectedThumbnail: PropTypes.string,
  CloseModal: PropTypes.bool,
};

ViewUser.defaultProps = {
  formData: {},
  selectedProfilePicture: null,
  selectedThumbnail: null,
};

export default ViewUser;
