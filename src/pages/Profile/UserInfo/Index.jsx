import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ViewUser from './ViewUsers';
import { CircularProgress, Typography } from '@mui/material';
import { fetchViewUser } from '../../../redux/slices/ViewUser';
import { Img_BASE_URL } from '../../../config/apiConfig';

const UserViewPage = ({ CloseModal, userId }) => {
  const dispatch = useDispatch();
  const { viewUser, loading, error } = useSelector((state) => state.viewUser);

  useEffect(() => {
    if (userId) {
      dispatch(fetchViewUser(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <CircularProgress />;
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
    role: viewUser.role.name, // Assuming role data is in 'role.name'
  };

  const selectedProfilePicture = `${Img_BASE_URL}/${viewUser.profile_picture}`;
  const selectedThumbnail = `${Img_BASE_URL}/${viewUser.school?.thumbnail}`; // Optional, based on school data

  return (
    <ViewUser
      formData={formData}
      selectedProfilePicture={selectedProfilePicture}
      selectedThumbnail={selectedThumbnail}
      CloseModal={CloseModal}
    />
  );
};

UserViewPage.propTypes = {
  CloseModal: PropTypes.func.isRequired, // Changed to func as it's used to close the modal
  userId: PropTypes.number.isRequired, // Added userId prop
};

export default UserViewPage;
