import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';

import { TextField, Button, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import { FormContainer, UploadBox, UploadContainer, ImagePreview, EditIcon } from './Style';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import WebURL from '../../../assets/FormsIcon/WebsiteIcon.svg';
import { addUser } from '../../../redux/postApiSlices/AddUserSlice';
import SubmitButton from '../../Button/FormButton';
import CustomDatePicker from '../../DatePicker/Index';
import DropdownField from '../../Dropdown/Index';
import SearchableDropdown from '../../Dropdown/SearchDropdown';
import InputField from '../../InputField/Index';
import extractDate from '../../../utils/formatDateTime';
import Cookies from 'js-cookie';
const AddUser = ({ CloseModal }) => {
  const dispatch = useDispatch();
  let schoolId = Cookies.get('school_Id');
  schoolId = Cookies.get('schoolId');
  const max18YearsOldDate = new Date();
  max18YearsOldDate.setFullYear(max18YearsOldDate.getFullYear() - 18);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    phone: '',
    password: '123456',
    role_id: 5,
    gender: 'Male',
    country: '',
    dob: new Date(),
    enrollment_date: new Date(),
    address: '',
    school_id: schoolId,
    status_id: 1,
  });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [errors, setErrors] = useState({});
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [selectedEnrollmentDate, setSelectedEnrollmentDate] = useState(new Date());
  const [selectedDOBDate, setSelectedDOBDate] = useState(max18YearsOldDate);

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
    if (name === 'dob') {
      setSelectedDOBDate(date);
    } else if (name === 'enrollment_date') {
      setSelectedEnrollmentDate(date);
    }
  };
  // console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Special handling for username field to disallow spaces
    if (name === 'username') {
      const newValue = value.replace(/\s+/g, ''); // Remove all spaces
      if (value !== newValue) {
        setErrors({ ...errors, username: 'Username formate invalid' });
      } else {
        setErrors({ ...errors, username: '' }); // Clear error if valid
      }
    }

    if (name === 'phone') {
      // Allow only numbers, plus (+), and hyphen (-), and restrict length to 15 characters
      const numericValue = value.replace(/[^0-9+-]/g, '').slice(0, 15);
      setFormData({ ...formData, [name]: numericValue });
    } else if (name === 'country') {
      // Allow only letters and spaces for the country field
      const alphabeticValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({ ...formData, [name]: alphabeticValue });
    } else if (name === 'email') {
      // Email validation pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setErrors({ ...errors, email: 'Invalid email format' });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // Clear error message when user starts typing again
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
        setErrors((prev) => ({ ...prev, profile_picture: 'Please select a Profile below 2MB' }));
        setSelectedProfilePicture(null);
      } else {
        setSelectedProfilePicture(URL.createObjectURL(file));
        setErrors({ ...errors, profile_picture: '' });
      }

      // setSelectedProfilePicture(URL.createObjectURL(file));
      // setErrors({ ...errors, profile_picture: '' }); // Clear error when file is selected
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'address') {
        newErrors[key] = 'This field is required';
      }
    });
    if (!selectedProfilePicture) {
      newErrors.profile_picture = 'Profile picture is required';
    }
    if (!selectedDOBDate) {
      newErrors.dob = 'Date of birth is required';
    }
    if (!selectedEnrollmentDate) {
      newErrors.enrollment_date = 'Enrollment date is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Convert formData to FormData instance
      const profilePictureFile = document.querySelector('#Upload_Profile_Picture').files[0];
      console.log('helowww');

      const data = {
        ...formData,
        dob: extractDate(formData.dob),
        enrollment_date: extractDate(formData.enrollment_date),
        profile_picture: profilePictureFile ? profilePictureFile : null,
      };

      // Dispatch the addUser action
      dispatch(addUser(data))
        .unwrap()
        .then(() => {
          CloseModal(); // Close the modal on success
        })
        .catch((error) => {
          console.error('Failed to add user:', error);
        });
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Knowroos</span>
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
      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} sm={3}>
          <UploadContainer>
            <UploadBox
              style={{
                backgroundColor: '#f4faf4',
                border: 'none',
                borderRadius: '13px',
                width: '100%',
                padding: '43% 2%',
              }}
            >
              <input
                accept=".png,.jpg,.jpeg"
                style={{ display: 'none' }}
                id="Upload_Profile_Picture"
                type="file"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="Upload_Profile_Picture"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {selectedProfilePicture ? (
                  <>
                    <ImagePreview src={selectedProfilePicture} alt="Profile Picture" />
                    <EditIcon src={Editicon} alt="Edit Icon" />
                  </>
                ) : (
                  <>
                    <img src={CameraIcon} alt="Upload Profile Picture" />
                    <Typography
                      style={{
                        color: '#4CAF50',
                        fontSize: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Upload Profile Picture
                    </Typography>
                  </>
                )}
              </label>
            </UploadBox>
            {errors.profile_picture && (
              <Typography variant="caption" color="error">
                {errors.profile_picture}
              </Typography>
            )}
          </UploadContainer>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <InputField
                name="fname"
                label="First Name"
                variant="outlined"
                value={formData.fname}
                onChange={handleInputChange}
                error={!!errors.fname}
                placeholder="Enter First Name"
                helperText={errors.fname}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name="lname"
                label="Last Name"
                variant="outlined"
                value={formData.lname}
                onChange={handleInputChange}
                error={!!errors.lname}
                placeholder="Enter Last Name"
                helperText={errors.lname}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            placeholder="Enter User Name"
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            placeholder="Enter Email"
            helperText={errors.email}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <InputField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            placeholder="Enter Password"
            helperText={errors.password}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <InputField
            name="phone"
            label="Phone"
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            placeholder="Enter Phone"
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="gender"
            label="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            error={!!errors.gender}
            helperText={errors.gender}
            options={['Male', 'Female']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="country"
            label="Country"
            variant="outlined"
            value={formData.country}
            onChange={handleInputChange}
            error={!!errors.country}
            placeholder="Enter Country"
            helperText={errors.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="address"
            label="Address"
            variant="outlined"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            placeholder="Enter Address"
            helperText={errors.address}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <DropdownField
            name="role_id"
            label="Role"
            value={formData.role_id}
            onChange={handleInputChange}
            error={!!errors.role_id}
            helperText={errors.role_id}
            options={[
              { label: 'School Admin', value: '2' },
              { label: 'Knowroos', value: '5' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomDatePicker
            value={selectedDOBDate}
            onChange={(date) => handleDateChange(date, 'dob')}
            placeholder="Select a date"
            label="Date of Birth"
            fullWidth
            textFieldStyle={{ backgroundColor: '#f0f0f0' }}
            iconStyle={{ right: '10px' }}
            // onlyPastDates={true}
            max18yearOld={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomDatePicker
            value={selectedEnrollmentDate}
            onChange={(dte) => handleDateChange(dte, 'enrollment_date')}
            placeholder="Select a date"
            label="Enrollment Date"
            fullWidth
            textFieldStyle={{ backgroundColor: '#f0f0f0' }}
            iconStyle={{ right: '10px' }}
            onlyPastDates={true}
          />
        </Grid>
      </Grid>
      <SubmitButton
        icon={SubmitIcon}
        title="Add"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddUser.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddUser;
