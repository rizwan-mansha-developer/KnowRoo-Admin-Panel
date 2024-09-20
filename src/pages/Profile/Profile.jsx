import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import ProfileCard from '../../components/Card/ProfileCard';
import AddUser from '../../components/Form/AddUser/Index';
import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';
import AdminLayout from '../../layouts/AdminLayout';
import { Grid, CircularProgress, Snackbar } from '@mui/material';
import { resetDeleteStatus } from '../../redux/deleteSlices/UserDeleteSlice';
import { resetStatus } from '../../redux/postApiSlices/AddUserSlice';
import { fetchUser } from '../../redux/slices/UserSlice';
import UserSkeleton from '../../components/Skeleton/UserSkeleton';
import { Img_BASE_URL } from '../../config/apiConfig';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';

// import { schoolId } from '../../utils/reuseableId';
import Cookies from 'js-cookie';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';
const Profile = () => {
  const dispatch = useDispatch();
  const { user = [], loading, error } = useSelector((state) => state.user);
  const { userLoading, userError, status } = useSelector((state) => state.addUser);
  const { deleteError, deleteStatus } = useSelector((state) => state.deleteUser);

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const schoolId = Cookies.get('schoolId');
  useEffect(() => {
    dispatch(fetchUser(schoolId));
  }, [dispatch, schoolId]);

  useEffect(() => {
    if (status === 'success') {
      setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
      dispatch(fetchUser(schoolId));
    } else if (status === 'error') {
      setSnackbar({ open: true, message: userError || 'Failed to add user', severity: 'error' });
    }
    dispatch(resetStatus()); // Reset status after displaying message
  }, [status, userError, dispatch]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      dispatch(fetchUser(schoolId));
    } else if (deleteStatus === 'failed') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete user',
        severity: 'error',
      });
    }
    dispatch(resetDeleteStatus());
  }, [deleteStatus, deleteError]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const getUserDesignation = (role_id) => {
    switch (role_id) {
      case 1:
        return 'Site Admin';
      case 2:
        return 'School Admin';
      case 3:
        return 'Teacher';
      case 4:
        return 'Teacher Assistant';
      case 5:
        return 'Knowroos';
      default:
        return 'Unknown';
    }
  };

  const renderProfileCards = () =>
    _.map(user, (profile) => (
      <ProfileCard
        id={profile.id}
        profileImage={`${Img_BASE_URL}/${profile.profile_picture}`} // Adjust based on your API response
        userName={`${profile.fname} ${profile.lname}`}
        userDesignation={getUserDesignation(profile.role_id)}
        phoneNumber={profile.phone}
        email={profile.email}
      />
    ));

  return (
    <AdminLayout>
      <Grid container spacing={0.5} marginTop="1px">
        <Grid item xs={12}>
          <SearchBar
            ButtonText="Add Knowroos"
            toggleDoorBar={handleModalOpen}
            PlaceholderText="search...."
          />
        </Grid>
        {loading ? (
          _.map([...Array(6)], (_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <UserSkeleton />
            </Grid>
          ))
        ) : user?.notFound || user.length <= 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60vh',
              flexDirection: 'column',
              marginLeft: '40%',
            }}
          >
            <img
              src={NotFoundIcon}
              alt="Not Found"
              style={{ width: '150px', height: '150px', marginBottom: '20px' }}
            />
            <p style={{ fontSize: '18px', color: '#555' }}>User not found</p>
          </div>
        ) : (
          <Grid display="flex" gap="10px" flexWrap="wrap">
            {renderProfileCards()}
          </Grid>
        )}
      </Grid>
      <ModalOpen
        AddContent={<AddUser CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
      />

      {/* Loader */}
      {userLoading && <Loader />}

      {/* Snackbar */}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AdminLayout>
  );
};

export default Profile;
