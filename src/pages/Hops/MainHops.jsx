import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';

import AdminLayout from '../../layouts/AdminLayout';
import { Alert, Grid, Snackbar } from '@mui/material';
import LeapSkeleton from '../../components/Skeleton/LeapSkeleton';
import HopsCard from '../../components/Card/HopsCard';
import { fetchHops } from '../../redux/slices/MainHops';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import AddHops from './../../components/Form/AddHop/Index';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
import { resetStatus } from '../../redux/postApiSlices/AddHopsSlice';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const MainHops = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || Cookies.get('leaps_Id'));
  const { hopsData = [], loading, error } = useSelector((state) => state.hops);
  const { hopsLoading, hopsError, status } = useSelector((state) => state.addHops);
  const { deleteError, deleteStatus } = useSelector((state) => state.deleteHops);

  const [cardsToShow, setCardsToShow] = useState(3);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

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
    dispatch(fetchHops(id));
    calculateCardsToShow();
    window.addEventListener('resize', calculateCardsToShow);
    return () => {
      window.removeEventListener('resize', calculateCardsToShow);
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (status === 'success') {
      setSnackbar({ open: true, message: 'Hops added successfully', severity: 'success' });
      handleModalClose();
      dispatch(fetchHops(id));
    } else if (status === 'error') {
      setSnackbar({ open: true, message: hopsError || 'Failed to add hops', severity: 'error' });
    }
    dispatch(resetStatus());
  }, [status, hopsError, dispatch, id]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'Hops deleted successfully', severity: 'success' });
      dispatch(fetchHops(id));
    } else if (deleteStatus === 'error') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete hops',
        severity: 'error',
      });
    }
    // dispatch(resetDeleteStatus());
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

  const renderHopsCards = () => {
    if (loading) {
      // Generate a number of skeletons equal to hopsData.length or a default number if empty
      const skeletonsToShow = hopsData?.length || 3; // Default to 3 skeletons if no data
      return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {Array.from({ length: skeletonsToShow }, (_, index) => (
            <LeapSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (hopsData?.notFound || hopsData?.length === 0 || error) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            // marginLeft: '40%',
            flexDirection: 'column',
          }}
        >
          <img src={NotFoundIcon} alt="Not Found" />
          <p>Hops not found</p>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {hopsData.map((hop, index) => (
          <HopsCard
            key={hop.id}
            count={index}
            id={hop.id}
            hopsName={hop.name}
            // prerequisite={hop.prerequisite}
            hopsDetails={hop.description}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div
        style={{
          marginTop: '0px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          flexWrap: 'wrap',
          // justifyContent: 'center',
        }}
      >
        <SearchBar
          ButtonText="Add Hops"
          toggleDoorBar={handleModalOpen}
          PlaceholderText="search...."
        />
        <Grid>{renderHopsCards()}</Grid>
      </div>
      <ModalOpen
        AddContent={<AddHops id={id} CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      {hopsLoading && <Loader />}
    </AdminLayout>
  );
};

export default MainHops;
