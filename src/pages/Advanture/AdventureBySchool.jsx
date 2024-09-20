import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import AdvantureCard from '../../components/Card/Advanture';
import RecentAdvantureCard from '../../components/Card/RecentAdventure';
import AddAdventure from '../../components/Form/AddAdvanture/Index';
import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';
import AdventureAllSkeleton from '../../components/Skeleton/AdventureAllSkeleton';
import AdminLayout from '../../layouts/AdminLayout';
import Cookies from 'js-cookie';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Skeleton,
  useMediaQuery,
  Snackbar,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { Box } from '@mui/system';
import profile from '../../assets/profile.svg';
import { resetDeleteStatus } from '../../redux/deleteSlices/AdventureDeleteSlice';
import { resetStatus } from '../../redux/postApiSlices/AddAdventureSlice';
import { fetchAdventure } from '../../redux/slices/AdventureSlice';
import { useLocation } from 'react-router-dom';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
import { fetchAdventureBySchool } from '../../redux/slices/AdventureBySchoolId';
import AdvCardBySchool from '../../components/Card/AdventureBySchool';
import { Img_BASE_URL } from '../../config/apiConfig';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const AdvBySchool = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const [id, setId] = useState(location.state?.id || Cookies.get('mobs_Id'));
  const schoolId = Cookies.get('schoolId');
  const {
    adventureBySchool = [],
    loading,
    error,
  } = useSelector((state) => state.adventureBySchool);
  const { deleteLoading, deleteError, deleteStatus } = useSelector(
    (state) => state.deleteAdventure
  );
  const { advLoading, advError, status } = useSelector((state) => state.addadventure);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  // Media query hooks
  const isDesktop = useMediaQuery('(min-width:1200px)');
  const isTablet = useMediaQuery('(min-width:600px) and (max-width:1199px)');
  const isMobile = useMediaQuery('(max-width:599px)');
  // const LeapLength = adventureBySchool?.length;
  useEffect(() => {
    dispatch(fetchAdventureBySchool(schoolId));
  }, [dispatch, schoolId]);
  useEffect(() => {
    if (status === 'success') {
      setSnackbar({ open: true, message: 'Adventure added successfully', severity: 'success' });
      dispatch(fetchAdventureBySchool(schoolId));
      handleModalClose();
    } else if (status === 'error') {
      setSnackbar({
        open: true,
        message: advError || 'Failed to add adventure',
        severity: 'error',
      });
    }
    dispatch(resetStatus());
  }, [status, advError, dispatch, schoolId]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'Adventure deleted successfully', severity: 'success' });
      dispatch(fetchAdventureBySchool(schoolId)); // Refresh the adventure list
    } else if (deleteStatus === 'error') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete adventure',
        severity: 'error',
      });
    }
    dispatch(resetDeleteStatus());
  }, [deleteStatus, deleteError, dispatch]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const renderSkeletonCards = (count, height) => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {_.map([...Array(count)], (_, index) => (
        <AdventureAllSkeleton key={index} />
      ))}
    </div>
  );

  const renderRecentAdvantureCards = () => {
    const cardCount = isDesktop ? 3 : isTablet ? 2 : 1;
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {_.map(adventureBySchool?.slice(0, cardCount), (adv) => (
          <RecentAdvantureCard
            key={adv.id}
            id={adv.id}
            AdvantureName={adv.name}
            AdvantureDetails={adv.description}
            CurrentStatus={adv.status_id}
          />
        ))}
      </div>
    );
  };

  const renderAdvantureCards = () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {_.map(adventureBySchool, (adv) => (
        <AdvCardBySchool
          key={adv.id}
          id={adv.id}
          AdvantureName={adv.name}
          AdvantureDetails={adv.description}
          img={`${Img_BASE_URL}/${adv.thumbnail}`}
          CurrentStatus={adv.status_id}
        />
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <Grid
        container
        style={{
          // marginBottom: '2px',
          marginTop: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <SearchBar
          ButtonText="Add Adventure"
          toggleDoorBar={handleModalOpen}
          PlaceholderText="search...."
        />
        <Grid>
          {loading ? (
            renderSkeletonCards(6, 150)
          ) : adventureBySchool?.notFound || adventureBySchool?.length <= 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                flexDirection: 'column',
              }}
            >
              <img src={NotFoundIcon} />
              <p>Adventure not found</p>
            </div>
          ) : (
            renderAdvantureCards()
          )}
        </Grid>
      </Grid>
      <ModalOpen
        AddContent={<AddAdventure CloseModal={handleModalClose} />}
        CloseModal={handleModalClose}
        OpenModal={openModal}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      {advLoading && <Loader />}
    </AdminLayout>
  );
};

export default AdvBySchool;
