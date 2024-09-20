import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import SchoolsCard from '../../components/Card/SchoolsCard';
import AddSchools from '../../components/Form/AddSchools/Index';
import ModalOpen from '../../components/Modal/Modal';
import SearchBar from '../../components/SearchBar/Searchbar';
import Loader from '../../components/Skeleton/Loader';
import AdminLayout from '../../layouts/AdminLayout';
import { Grid } from '@mui/material';
import { Img_BASE_URL } from '../../config/apiConfig';
import { deleteSchool, resetDeleteStatus } from '../../redux/deleteSlices/SchoolDeleteSlice';
import { fetchSchools } from '../../redux/slices/Schools';
import SchoolSkeleton from '../../components/Skeleton/SchoolSkeleton';
import NotFoundIcon from '../../assets/CardsIcon/notFound.svg';
import { resetStatus } from '../../redux/postApiSlices/AddSchoolSlice';
import CustomSnackbar from '../../components/Snackbar/CustomSnackbar';

const Schools = () => {
  const dispatch = useDispatch();
  const { schools = [], loading, error } = useSelector((state) => state.schools);
  const { addSchoolsloading, addSchoolserror, status } = useSelector((state) => state.school);
  const { deleteLoading, deleteError, deleteStatus } = useSelector((state) => state.schoolsDelete);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchSchools());
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setSnackbar({ open: true, message: 'School added successfully', severity: 'success' });
      dispatch(fetchSchools());
      dispatch(resetStatus());
    } else if (status === 'error') {
      const errorMessage =
        typeof addSchoolserror === 'string' ? addSchoolserror : JSON.stringify(addSchoolserror);
      setSnackbar({
        open: true,
        message: errorMessage || 'Failed to add school',
        severity: 'error',
      });
      dispatch(resetStatus());
    }

    if (deleteStatus === 'succeeded') {
      setSnackbar({ open: true, message: 'School deleted successfully', severity: 'success' });
      dispatch(fetchSchools());
    } else if (deleteStatus === 'failed') {
      setSnackbar({
        open: true,
        message: deleteError || 'Failed to delete school',
        severity: 'error',
      });
      dispatch(resetDeleteStatus());
    }

    dispatch(resetDeleteStatus());
  }, [status, addSchoolserror, deleteStatus, deleteError]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDeleteSchool = (id) => {
    dispatch(deleteSchool(id));
  };

  const renderSchoolCards = () => {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            borderRadius: '20px',
            justifyContent: 'center',
          }}
        >
          {[...Array(6)].map((_, index) => (
            <SchoolSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (schools?.notFound || schools?.length === 0 || error) {
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
          <p>Schools not found</p>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {schools &&
          schools.map((school) => (
            <SchoolsCard
              key={school.id}
              id={school.id}
              img={`${Img_BASE_URL}/${school.thumbnail}`}
              schoolName={school.name}
              schoolDetails={school.description}
              CurrentStatus={school.status_id}
              logo={`${Img_BASE_URL}/${school.school_logo}`}
              onDelete={() => handleDeleteSchool(school.id)} // Pass delete handler
            />
          ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <Grid style={{ marginTop: '5px' }}>
        <SearchBar
          ButtonText="Add School/Comapny"
          toggleDoorBar={handleModalOpen}
          PlaceholderText="search...."
        />
        {renderSchoolCards()}
        <ModalOpen
          AddContent={<AddSchools CloseModal={handleModalClose} />}
          CloseModal={handleModalClose}
          OpenModal={openModal}
        />
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      {/* Loader */}
      {addSchoolsloading && <Loader />}
    </AdminLayout>
  );
};

Schools.propTypes = {
  data: PropTypes.string,
};

export default Schools;
