import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import LeapsCard from '../../components/Card/LeapsCard';
import AddLeaps from '../../components/Form/AddLeaps/Index';
import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';
import AdminLayout from '../../layouts/AdminLayout';
import { Grid, Snackbar, CircularProgress, Backdrop, Alert, useMediaQuery } from '@mui/material';
import profile from '../../assets/profile.svg';
import { Img_BASE_URL } from '../../config/apiConfig';
import { resetDeleteStatus } from '../../redux/deleteSlices/LeapsDeleteSlice';
import { fetchLeaps } from '../../redux/slices/LeapsSlice';
import LeapSkeleton from '../../components/Skeleton/LeapSkeleton';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
import { assignTA } from './../../redux/postApiSlices/AssignTASlice';
import { resetaddStatus } from '../../redux/postApiSlices/AddLeapsSlice';
import AddLeapsAssignLeaps from './../../components/Form/AddLeaps/AddLeapsWithAssign';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const Leaps = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || Cookies.get('adv_Id'));
  const { leaps = [], loading, error } = useSelector((state) => state.leaps);
  const { leapsLoading, leapsError, addStatus } = useSelector((state) => state.addleaps);
  const { deleteError, deleteStatus } = useSelector((state) => state.deleteLeaps);
  const { assignTAError, assignTALoading, assignTaStatus } = useSelector((state) => state.assignTA);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const calculateCardsToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= breakpoints.xl) {
      setCardsToShow(6);
    } else if (screenWidth >= breakpoints.lg) {
      setCardsToShow(5);
    } else if (screenWidth >= breakpoints.md) {
      setCardsToShow(4);
    } else if (screenWidth >= breakpoints.sm) {
      setCardsToShow(3);
    } else {
      setCardsToShow(2);
    }
  };

  useEffect(() => {
    dispatch(fetchLeaps(id));
    calculateCardsToShow();
    window.addEventListener('resize', calculateCardsToShow);
    return () => {
      window.removeEventListener('resize', calculateCardsToShow);
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (addStatus === 'success') {
      setSnackbar({ open: true, message: 'Leap added successfully', severity: 'success' });
      handleModalClose();
      dispatch(fetchLeaps(id));
    } else if (addStatus === 'error') {
      setSnackbar({ open: true, message: leapsError || 'Failed to add leap', severity: 'error' });
    }
    dispatch(resetaddStatus());
  }, [addStatus, leapsError, dispatch, id]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'Leap deleted successfully', severity: 'success' });
      dispatch(fetchLeaps(id));
    } else if (deleteStatus === 'error') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete leap',
        severity: 'error',
      });
    }
    dispatch(resetDeleteStatus());
  }, [deleteStatus, deleteError, dispatch, id]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };
  return (
    <AdminLayout>
      <Grid
        container
        style={{
          marginTop: '5px',
          // marginBottom:'10px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          // justifyContent: 'center',
        }}
      >
        <SearchBar
          ButtonText="Add Leaps"
          toggleDoorBar={handleModalOpen}
          PlaceholderText="search...."
        />
        <Grid>
          {' '}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {loading ? (
              _.map([...Array(6)], (_, index) => <LeapSkeleton key={index} />)
            ) : leaps?.notFound || leaps?.length <= 0 ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '60vh',
                  flexDirection: 'column',
                  marginLeft: isMobile ? '20%' : '40%',
                }}
              >
                <img src={NotFoundIcon} />
                <p>Leaps not found</p>
              </div>
            ) : (
              _.map(leaps, (leap) => (
                <LeapsCard
                  key={leap.id}
                  id={leap.id}
                  img={`${Img_BASE_URL}/${leap.thumbnail}`}
                  LeapsName={leap.name}
                  prerequisite={leap.prerequisite}
                  LeapsDetails={leap.description}
                  avatars={[profile, profile, profile, profile]}
                  statusUpdated={leap.status_id}
                />
              ))
            )}
          </div>
        </Grid>
      </Grid>
      <ModalOpen
        AddContent={<AddLeapsAssignLeaps CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      {(leapsLoading || assignTALoading) && <Loader />}
    </AdminLayout>
  );
};

Leaps.propTypes = {
  data: PropTypes.string,
};

export default Leaps;
