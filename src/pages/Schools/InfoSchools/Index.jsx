import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@mui/material';
import ViewSchool from './ViewSchools';
import { fetchViewSchool } from '../../../redux/slices/ViewSchool';
import { Img_BASE_URL } from '../../../config/apiConfig';
// import { fetchViewSchool } from '../../redux/slices/viewSchoolSlice';

const SchoolsInfo = ({ CloseModal, schoolId }) => {
  const dispatch = useDispatch();
  const { viewSchool, loading, error } = useSelector((state) => state.viewSchool);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchViewSchool(schoolId));
    }
  }, [dispatch, schoolId]);

  if (loading) {
    return <CircularProgress />;
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
    <ViewSchool formData={formData} thumbnail={thumbnail} logo={logo} CloseModal={CloseModal} />
  );
};

SchoolsInfo.propTypes = {
  CloseModal: PropTypes.func.isRequired,
  schoolId: PropTypes.string.isRequired,
};

export default SchoolsInfo;
