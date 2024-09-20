import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MobsCard from '../../components/Card/Mobs';
import AddMobs from '../../components/Form/AddMob/Index';
import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';
import AdminLayout from '../../layouts/AdminLayout';
import { Button, Grid, Snackbar, CircularProgress, Backdrop, Alert } from '@mui/material';
import { Img_BASE_URL } from '../../config/apiConfig';
import { resetDeleteStatus } from '../../redux/deleteSlices/MobDeleteSlice';
import { resetStatus } from '../../redux/postApiSlices/AddMobSlice';
import { fetchGroups } from '../../redux/slices/MobSlice';
import MobSkeleton from '../../components/Skeleton/MobSkeleton';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
import { resetassignTeacherStatus } from '../../redux/postApiSlices/AssignTeacherSlice';
import AddMobsWithAdv from '../../components/Form/AddMob/AddMobs';
import AddAdvInMob from '../../components/Form/AddMob/AddAdventure';
import AddAdventure from '../../components/Form/AddAdvanture/Index';
import MobsTabs from './MobsTabs';
import { fetchUser } from '../../redux/slices/UserSlice';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const Mobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const { id , AdvantureName} = location.state || {};
  const [id, setId] = useState(location.state?.id || Cookies.get('schoolId'));
  const IsTeacher = Cookies.get('is_teacher');
  const { groups, loading, error } = useSelector((state) => state.groups);
  const { deleteError, deleteStatus } = useSelector((state) => state.deleteMobs);
  const { mobLoading, mobError, status } = useSelector((state) => state.mob);
  const { user = [] } = useSelector((state) => state.user);
  const Role_Id = Cookies.get('role_id');
  const { assignTeacherToMobLoading, assignTeacherToMobError, assignTeacherstatus } = useSelector(
    (state) => state.assignTeacherToMob
  );

  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    dispatch(fetchGroups(id));
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (assignTeacherstatus === 'success') {
      setSnackbar({ open: true, message: 'Teacher assigned successfully!', severity: 'success' });
      setSnackbar(true);
    } else if (assignTeacherToMobError) {
      setSnackbar({
        open: true,
        message: mobError || 'Failed to Assign Teacher',
        severity: 'error',
      });
    }
    dispatch(resetassignTeacherStatus());
  }, [assignTeacherstatus]);

  useEffect(() => {
    if (status === 'success') {
      setSnackbar({ open: true, message: 'Mob added successfully', severity: 'success' });
      handleModalClose();
      dispatch(fetchGroups(id));
    } else if (status === 'error') {
      setSnackbar({ open: true, message: mobError || 'Failed to add mob', severity: 'error' });
    }
    dispatch(resetStatus());
    dispatch(resetassignTeacherStatus());
  }, [status, mobError, id]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'Mob deleted successfully', severity: 'success' });
      dispatch(fetchGroups(id));
    } else if (deleteStatus === 'error') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete mob',
        severity: 'error',
      });
    }
    dispatch(resetDeleteStatus());
  }, [deleteStatus, deleteError, id]);

  const handleModalOpen = () => {
    if (user.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please add a Knowroos first',
        severity: 'error',
      });
    } else {
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const renderMobsCards = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[...Array(6)].map((_, index) => (
            <MobSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (groups?.notFound || error) {
      return (
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
          <p>Mobs not found</p>
        </div>
      );
    }

    return (
      <Grid style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {groups?.length &&
          groups
            ?.filter((group) => {
              if (Role_Id == 1 || Role_Id == 2) {
                return true;
              } else if (IsTeacher === true) {
                return group.is_teacher; // Apply filter based on `is_teacher` when Role_Id is 3
              } else {
                return group.is_added;
              }
            })
            ?.map((group) => (
              <MobsCard
                key={group.id}
                id={group.id}
                img={`${Img_BASE_URL}/${group.thumbnail}`}
                MobsName={group.name}
                MobsDetails={group.description}
                avatars={group.random_users?.map(
                  (user) => `${Img_BASE_URL}/${user.profile_picture}`
                )}
                userCount={group.user_count}
                CurrentStatus={group.status_id}
              />
            ))}
      </Grid>
    );
  };

  return (
    <AdminLayout>
      <div
        style={{
          marginTop: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <SearchBar
          ButtonText="Add Mob"
          toggleDoorBar={handleModalOpen}
          PlaceholderText="search...."
        />
        <Grid>
          <MobsTabs />
        </Grid>
        <ModalOpen
          AddContent={<AddMobsWithAdv CloseModal={handleModalClose} />}
          CloseModal={handleModalClose}
          OpenModal={openModal}
        />
      </div>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />

      {(mobLoading || assignTeacherToMobLoading) && <Loader />}
    </AdminLayout>
  );
};

export default Mobs;
