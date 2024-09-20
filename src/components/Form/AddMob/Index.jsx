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
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Switch,
  Avatar,
  Alert,
} from '@mui/material';
import { FormContainer, UploadBox, UploadContainer, ImagePreview, EditIcon } from './Style';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import DropdownField from '../../Dropdown/Index';
import { addMobs, resetStatus } from '../../../redux/postApiSlices/AddMobSlice';
import SubmitButton from '../../Button/FormButton';
import InputField from '../../InputField/Index';
import Cookies from 'js-cookie';
import { fetchUser } from '../../../redux/slices/UserSlice';
import { Img_BASE_URL } from '../../../config/apiConfig';

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
    user_ids: [],
    description: '',
    role_user_ids: [],
  });

  const [errors, setErrors] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [toggleStates, setToggleStates] = useState({}); // Track toggle state for each user
  console.log(toggleStates);

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
      role_user_ids: [],
    });
    setSelectedThumbnail(null);
    setErrors({});
    setToggleStates({});
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
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, thumbnail: 'Please select an Thumbnail below 2MB' }));
        setSelectedThumbnail(null);
      } else {
        setSelectedThumbnail(file);
        setErrors((prev) => ({ ...prev, thumbnail: '' }));
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
        } else if (key === 'role_user_ids') {
          formData[key].forEach((user, index) => {
            mobData.append(`role_user_ids[${index}]`, user);
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

  const handleCheckboxChange = (userId) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.user_ids.includes(userId);
      const newUserIds = isSelected
        ? prevFormData.user_ids.filter((id) => id !== userId)
        : [...prevFormData.user_ids, userId];

      if (isSelected) {
        setToggleStates((prevToggleStates) => ({
          ...prevToggleStates,
          [userId]: false, // Reset toggle state if the user is unchecked
        }));
      }

      return { ...prevFormData, user_ids: newUserIds };
    });
  };

  const handleToggleChange = (userId) => {
    setToggleStates((prevToggleStates) => {
      const newToggleState = !prevToggleStates[userId];

      setFormData((prevFormData) => {
        const newUserIds = newToggleState
          ? [...prevFormData.role_user_ids, userId] // Add user ID if toggle is true
          : prevFormData.role_user_ids.filter((id) => id !== userId); // Remove user ID if toggle is false

        return { ...prevFormData, role_user_ids: newUserIds };
      });

      return {
        ...prevToggleStates,
        [userId]: newToggleState,
      };
    });
  };

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
          right: '1%',
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

        <Grid item xs={12}>
          <InputField
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            value={formData.description}
            placeholder="Enter description"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid display="flex" justifyContent="space-between">
            <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
              {' '}
              Select Knowroos{' '}
            </label>
            <label
              style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161', flexGrow: 0.1 }}
              htmlFor={name}
            >
              {' '}
              Assign Teacher{' '}
            </label>
          </Grid>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <Alert severity="error">Error: {error}</Alert>
            </Box>
          ) : (
            <List
              style={{
                maxHeight: '300px',
                overflow: 'auto',
                background: '#f2f2f7',
                borderRadius: '12px',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {user
                ?.filter((user) => {
                  if (user.role_id === 1 || user.role_id === 2) {
                    return false;
                  } else {
                    return true;
                  }
                })
                ?.map((user) => (
                  <ListItem
                    key={user.id}
                    style={{
                      background: '#fff',
                      margin: '20px 0px',
                      width: '90%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <Checkbox
                      checked={formData.user_ids.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                    <Avatar src={`${Img_BASE_URL}/${user.profile_picture}`} />
                    <ListItemText
                      primary={`${user.fname} ${user.lname}`}
                      style={{ marginLeft: '10px' }}
                    />
                    {formData.user_ids.includes(user.id) && (
                      <Switch
                        checked={toggleStates[user.id] || false}
                        onChange={() => handleToggleChange(user.id)}
                        inputProps={{ 'aria-label': 'toggle visibility' }}
                      />
                    )}
                  </ListItem>
                ))}
            </List>
          )}
          {errors.user_ids && (
            <Typography
              color="error"
              variant="caption"
              display="block"
              style={{ textAlign: 'center' }}
            >
              {errors.user_ids}
            </Typography>
          )}
        </Grid>
      </Grid>
      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
      {status === 'loading' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === 'error' && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ open: false, message: '', severity: 'error' })}
          message="An error occurred while submitting the form."
        />
      )}
    </FormContainer>
  );
};

AddMobs.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddMobs;
