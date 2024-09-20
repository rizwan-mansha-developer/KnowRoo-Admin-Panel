import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import {
  TextField,
  Typography,
  Box,
  Grid,
  Snackbar,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { FormContainer, UploadBox, UploadContainer, ImagePreview, EditIcon } from './Style';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import WebURL from '../../../assets/FormsIcon/WebsiteIcon.svg';
import { addMobs, resetStatus } from '../../../redux/postApiSlices/AddMobSlice';
import SubmitButton from '../../Button/FormButton';
import DropdownField from '../../Dropdown/Index';
import SearchableDropdown from '../../Dropdown/SearchDropdown';
import InputField from '../../InputField/Index';
import Cookies from 'js-cookie';
import { fetchUser } from '../../../redux/slices/UserSlice';

const AddMobs = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { user = [], loading, error } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.mob);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const schoolId = Cookies.get('schoolId');
  const [formData, setFormData] = useState({
    name: '',
    group_type_id: '',
    school_id: schoolId,
    status_id: '1',
    user_ids: [1],
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  useEffect(() => {
    if (status === 'success') {
      resetFormData();
      CloseModal();
    }
  }, [status]);

  useEffect(() => {
    dispatch(fetchUser(schoolId));
  }, [dispatch]);

  const resetFormData = () => {
    setFormData({
      name: '',
      group_type_id: '',
      user_ids: [],
      description: '',
    });
    setSelectedThumbnail(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnail(file);
      if (errors.thumbnail) {
        setErrors({
          ...errors,
          thumbnail: '',
        });
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key].length === 0) {
        newErrors[key] = 'This field is required';
      }
    });
    if (!selectedThumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const mobData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'user_ids') {
          formData[key].forEach((user, index) => {
            mobData.append(`user_ids[${index}]`, user);
          });
        } else {
          mobData.append(key, formData[key]);
        }
      });
      if (selectedThumbnail) {
        mobData.append('thumbnail', selectedThumbnail);
      }
      dispatch(addMobs(mobData));
    }
  };

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const userOptions =
    user.length &&
    user?.map((user) => ({
      label: user.username,
      value: user.id,
    }));
  console.log(userOptions);

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Mobs</span>
      </Typography>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: isMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      />
      <UploadContainer>
        <UploadBox
          style={{
            backgroundColor: '#f4faf4',
            border: 'none',
            padding: '10% 23%',
            borderRadius: '13px',
            width: '100%',
          }}
        >
          <input
            accept=".png,.jpg"
            style={{ display: 'none' }}
            id="thumbnail-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="thumbnail-upload"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {selectedThumbnail ? (
              <>
                <ImagePreview src={URL.createObjectURL(selectedThumbnail)} alt="Thumbnail" />
                <EditIcon src={Editicon} alt="Edit Icon" />
              </>
            ) : (
              <>
                <img src={CameraIcon} alt="Thumbnail Upload" />
                <Typography
                  style={{
                    color: '#4CAF50',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Upload Thumbnail
                </Typography>
              </>
            )}
          </label>
        </UploadBox>
        {errors.thumbnail && (
          <Typography
            color="error"
            variant="caption"
            display="block"
            style={{ textAlign: 'center' }}
          >
            {errors.thumbnail}
          </Typography>
        )}
      </UploadContainer>

      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} sm={6}>
          <InputField
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="Enter name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="group_type_id"
            label="Type"
            value={formData.group_type_id}
            onChange={handleInputChange}
            error={!!errors.group_type_id}
            helperText={errors.group_type_id}
            options={[
              { label: 'Individual', value: '1' },
              { label: 'Team', value: '2' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="status_id"
            label="Status"
            value={formData.status_id}
            onChange={handleInputChange}
            error={!!errors.status_id}
            helperText={errors.status_id}
            options={[
              { label: 'Active', value: '1' },
              { label: 'Inactive', value: '2' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="user_ids"
            label="Select Users"
            value={formData.user_ids}
            onChange={handleInputChange}
            error={!!errors.user_ids}
            helperText={errors.user_ids}
            options={userOptions}
            multiple
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <InputField
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            placeholder="Enter description"
          />
        </Grid>
      </Grid>

      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddMobs.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddMobs;
