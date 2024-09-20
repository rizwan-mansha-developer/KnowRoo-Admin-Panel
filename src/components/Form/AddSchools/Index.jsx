import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Box,
  Grid,
  Divider,
  Snackbar,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addSchool, resetStatus } from '../../../redux/postApiSlices/AddSchoolSlice';
import WebURL from '../../../assets/FormsIcon/WebsiteIcon.svg';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import EditIcon from '../../../assets/FormsIcon/edit.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import SubmitButton from '../../Button/FormButton';
import { FormContainer, UploadBox, UploadContainer, ImagePreview, ErrorText } from './Style';
import InputField from '../../InputField/Index';
import DropdownField from '../../Dropdown/Index';
import Loader from '../../Skeleton/Loader';
import { getYearsList } from '../../../utils/YearList';

/**
 * AddSchools Component
 * @param {Function} CloseModal - Function to close the modal
 * @returns {JSX.Element}
 */
const AddSchools = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { addSchoolsloading, addSchoolserror, status } = useSelector((state) => state.school);
  const year = getYearsList();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    contact_info: '',
    website_url: '',
    principle: '',
    Institution_type: 'School',
    establishment_year: '2024',
    status_id: '1', // Default value for status (active)
  });

  const [errors, setErrors] = useState({});
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (status === 'success') {
      CloseModal();
      resetFormData();
    }
  }, [status]);

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      contact_info: '',
      website_url: '',
      principle: '',
      Institution_type: 'School',
      establishment_year: '2024',
      status_id: '1',
    });
    setSelectedLogo(null);
    setSelectedThumbnail(null);
    setErrors({});
  };
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Inline validation for the website URL
    if (name === 'website_url') {
      if (!urlPattern.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          website_url: 'Please enter a valid web link',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          website_url: '',
        }));
      }
    }

    // Handle other field validations if necessary
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'This field is required',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, school_logo: 'Please select an logo below 2MB' }));
        setSelectedLogo(null);
      } else {
        setSelectedLogo(file);
        setErrors((prev) => ({ ...prev, school_logo: '' }));
      }
    }
  };

  const handleThumbnailUpload = (e) => {
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
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // // Check if the website URL is valid
    // if (!urlPattern.test(formData.website_url)) {
    //   newErrors.website_url = 'Please enter a valid web link';
    // }
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = 'This field is required';
    });

    if (!selectedLogo) newErrors.school_logo = 'Logo is required';
    if (!selectedThumbnail) newErrors.thumbnail = 'Thumbnail is required';
    // Check for a valid website URL
    if (formData.website_url && !urlPattern.test(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid web link';
    }
    return newErrors;
  };
  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const schoolData = new FormData();
      Object.keys(formData).forEach((key) => schoolData.append(key, formData[key]));
      if (selectedLogo) schoolData.append('school_logo', selectedLogo);
      if (selectedThumbnail) schoolData.append('thumbnail', selectedThumbnail);
      dispatch(addSchool(schoolData));
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: '600', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add School/Company</span>
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
        <Box>
          <UploadBox
            sx={{ backgroundColor: '#f4faf4', border: 'none', p: '3% 23%', borderRadius: '13px' }}
          >
            <input
              accept=".png,.jpg"
              style={{ display: 'none' }}
              id="logo-upload"
              type="file"
              onChange={handleLogoUpload}
            />
            <label
              htmlFor="logo-upload"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {selectedLogo ? (
                <>
                  <ImagePreview src={URL.createObjectURL(selectedLogo)} alt="Selected Logo" />
                  <img
                    src={EditIcon}
                    alt="Edit Icon"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      width: '30px',
                    }}
                  />
                </>
              ) : (
                <>
                  <img src={CameraIcon} alt="Logo Upload" />
                  <Typography
                    sx={{
                      color: '#4CAF50',
                      fontSize: '12px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Upload Logo
                  </Typography>
                </>
              )}
            </label>
          </UploadBox>
          {errors.school_logo && <ErrorText>{errors.school_logo}</ErrorText>}
        </Box>
        <Box>
          <UploadBox
            sx={{ backgroundColor: '#f4faf4', border: 'none', p: '3% 23%', borderRadius: '13px' }}
          >
            <input
              accept=".png,.jpg"
              style={{ display: 'none' }}
              id="thumbnail-upload"
              type="file"
              onChange={handleThumbnailUpload}
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
                  <ImagePreview
                    src={URL.createObjectURL(selectedThumbnail)}
                    alt="Selected Thumbnail"
                  />
                  <img
                    src={EditIcon}
                    alt="Edit Icon"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      width: '30px',
                    }}
                  />
                </>
              ) : (
                <>
                  <img src={CameraIcon} alt="Thumbnail Upload" />
                  <Typography
                    sx={{
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
          {errors.thumbnail && <ErrorText>{errors.thumbnail}</ErrorText>}
        </Box>
      </UploadContainer>

      <Grid container spacing={3} sx={{ mb: '40px' }}>
        {[
          { name: 'name', label: 'Name', placeholder: 'Enter school name' },
          { name: 'address', label: 'Address', placeholder: 'Enter school address' },
          { name: 'principle', label: 'Principal/CEO', placeholder: "Enter principal's name" },
          { name: 'contact_info', label: 'Contact Info', placeholder: 'Enter contact info' },
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <InputField
              name={field.name}
              label={field.label}
              variant="outlined"
              value={formData[field.name]}
              onChange={handleInputChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
              placeholder={field.placeholder}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="establishment_year"
            label="Establishment Year"
            value={formData.establishment_year}
            onChange={handleInputChange}
            error={!!errors.establishment_year}
            helperText={errors.establishment_year}
            options={year}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="Institution_type"
            label="Institution Type"
            value={formData.Institution_type}
            onChange={handleInputChange}
            error={!!errors.Institution_type}
            helperText={errors.Institution_type}
            options={['School', 'Company']}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12}>
          <InputField
            name="Institution_type"
            label="Institution Type"
            variant="outlined"
            value={formData.Institution_type}
            onChange={handleInputChange}
            error={!!errors.Institution_type}
            helperText={errors.Institution_type}
            placeholder="Enter institution type"
          />
        </Grid> */}
        <Grid item xs={12}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
            Description
          </label>
          <TextField
            fullWidth
            name="description"
            // label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            placeholder="Enter school description"
            multiline
          />
        </Grid>
      </Grid>

      <Grid container sx={{ my: '10px' }} display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <img src={WebURL} alt="Website Icon" />
          <Typography
            sx={{
              textAlign: 'center',
              ml: '20px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#616161',
              mt: '8px',
            }}
          >
            Website
          </Typography>
        </Box>
        <TextField
          sx={{ width: { xs: '100%', sm: '75%' }, backgroundColor: '#f5f6f7' }}
          name="website_url"
          variant="outlined"
          value={formData.website_url}
          onChange={handleInputChange}
          error={!!errors.website_url}
          placeholder="Enter website URL"
        />
      </Grid>
      {errors.website_url && (
        <p style={{ color: 'red', fontSize: '12px', marginLeft: '26%' }}>{errors.website_url}</p>
      )}
      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddSchools.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddSchools;
