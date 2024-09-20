import React, { useState, useEffect } from 'react';
import { Typography, Grid, Snackbar, CircularProgress, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../../Button/FormButton';
import InputField from '../../InputField/Index';
import PropTypes from 'prop-types';
import { addAdventure, resetStatus } from '../../../redux/postApiSlices/AddAdventureSlice';
import Cookies from 'js-cookie';

import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import { EditIcon, ImagePreview, UploadBox, UploadContainer } from '../AddAdvanture/Stylee';
const AddAdvInMob = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { advLoading, status, error } = useSelector((state) => state.addadventure);
  const schoolId = Cookies.get('schoolId');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status_id: '1',
    school_id: schoolId,
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedAdvThumbnail, setSelectedAdvThumbnail] = useState(null);
  useEffect(() => {
    if (status === 'succeeded') {
      setOpenSnackbar(true);
      resetFormData();
      dispatch(resetStatus());
      CloseModal();
    }
  }, [status, dispatch, CloseModal]);

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      status_id: '1',
      school_id: schoolId,
    });
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

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleAdvFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, thumbnail: 'Please select a Thumbnail below 2MB' }));
        setSelectedAdvThumbnail(null);
      } else {
        setSelectedAdvThumbnail(file);
        setErrors((prev) => ({ ...prev, thumbnail: '' }));
      }
    }
  };

  const handleChildSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const AdvData = new FormData();
      Object.keys(formData).forEach((key) => AdvData.append(key, formData[key]));
      if (selectedAdvThumbnail) AdvData.append('thumbnail', selectedAdvThumbnail);

      dispatch(addAdventure(AdvData));
    }
  };

  return (
    <>
      <UploadContainer display="flex" justifyContent="center">
        <UploadBox
          sx={{ backgroundColor: '#f4faf4', border: 'none', p: '3% 23%', borderRadius: '13px' }}
        >
          <input
            accept=".png,.jpg"
            style={{ display: 'none' }}
            id="thumbnailAdv-upload"
            type="file"
            onChange={handleAdvFileUpload}
          />
          <label
            htmlFor="thumbnailAdv-upload"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {selectedAdvThumbnail ? (
              <>
                <ImagePreview
                  src={URL.createObjectURL(selectedAdvThumbnail)}
                  alt="Selected Thumbnail"
                />
                <EditIcon src={Editicon} alt="Edit Icon" />
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
      </UploadContainer>
      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12}>
          <InputField
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="Enter Name"
          />
        </Grid>
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
            // error={!!errors.description}
            // helperText={errors.description}
            placeholder="Enter description"
            multiline
          />
          {errors.description && (
            <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
              This field is required
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* {advLoading && <CircularProgress />} */}

      <SubmitButton
        onClick={handleChildSubmit}
        title="Add Adventure"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
        loading={advLoading}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={status === 'succeeded' ? 'Adventure added successfully!' : error}
      />
    </>
  );
};

AddAdvInMob.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddAdvInMob;
