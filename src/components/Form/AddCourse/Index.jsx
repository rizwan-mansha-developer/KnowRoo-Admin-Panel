import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Grid, Box, useMediaQuery } from '@mui/material';
import { FormContainer, UploadContainer, UploadBox } from './Style';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import PdfIcon from '../../../assets/FormsIcon/pdf.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import VideoIcon from '../../../assets/FormsIcon/video.svg';
import ZipIcon from '../../../assets/FormsIcon/zip1.svg';
import { addCourse, resetaddCourseStatus } from '../../../redux/postApiSlices/AddCourseSlice';
import SubmitButton from '../../Button/FormButton';
import InputField from '../../InputField/Index';
import Cookies from 'js-cookie';

const AddCourse = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { addCourseLoading, courseError, addCourseStatus } = useSelector(
    (state) => state.addCourse
  );
  const HopsId = Cookies.get('hops_Id');
  const UserId = Cookies.get('User_Id');
  const [formData, setFormData] = useState({
    title: '',
  });
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [errors, setErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({
    pic: null,
    video: null,
    pdf: null,
  });

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

  const handleFileUpload = (e) => {
    const { id, files } = e.target;
    const selectedFile = files[0] || null;

    setSelectedFiles({
      pic: id === 'pic' ? selectedFile : null,
      video: id === 'video' ? selectedFile : null,
      pdf: id === 'pdf' ? selectedFile : null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('module_id', HopsId);
      formDataToSend.append('user_id', UserId);

      // Add each file with the same key 'material'
      if (selectedFiles.pic) {
        formDataToSend.append('material', selectedFiles.pic);
      }
      if (selectedFiles.video) {
        formDataToSend.append('material', selectedFiles.video);
      }
      if (selectedFiles.pdf) {
        formDataToSend.append('material', selectedFiles.pdf);
      }

      dispatch(addCourse(formDataToSend))
        .then(() => {
          if (addCourseStatus === 'success') {
            CloseModal();
            dispatch(resetaddCourseStatus());
          }
        })
        .catch((error) => {
          console.error('Error:', error);
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
        <span>Add Course</span>
      </Typography>
      <img
        onClick={CloseModal}
        src={CloseIcon}
        alt="Close Icon"
        style={{
          width: IsMobile ? '25px' : '40px',
          cursor: 'pointer',
          position: 'absolute',
          top: '2%',
          right: '2%',
        }}
      />

      <Grid container spacing={3} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} sm={12}>
          <InputField
            name="title"
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            error={!!errors.title}
            helperText={errors.title}
            placeholder="Enter Title"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>Upload</label>
          <UploadContainer
            style={{
              backgroundColor: '#FAFAFB',
              padding: '3% 25%',
              marginTop: '2%',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <UploadBox style={{ border: 'none', borderRadius: '13px', width: '90%' }}>
                <input
                  accept=".png,.jpg,.jpeg"
                  style={{ display: 'none' }}
                  id="pic"
                  type="file"
                  onChange={handleFileUpload}
                  // disabled={!!selectedFiles.video || !!selectedFiles.pdf}
                />
                <label
                  htmlFor="pic"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <img src={ZipIcon} alt="Zip Upload" style={{ width: '80%' }} />
                </label>
              </UploadBox>
              {selectedFiles.pic && (
                <Typography variant="caption" style={{ marginTop: '8px' }}>
                  {selectedFiles.pic.name}
                </Typography>
              )}
            </Box>
            <Box>
              <UploadBox style={{ border: 'none', borderRadius: '13px', width: '90%' }}>
                <input
                  accept="video/*"
                  style={{ display: 'none' }}
                  id="video"
                  type="file"
                  onChange={handleFileUpload}
                  // disabled={!!selectedFiles.zip || !!selectedFiles.pdf}
                />
                <label
                  htmlFor="video"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <img src={VideoIcon} alt="Video Upload" style={{ width: '80%' }} />
                </label>
              </UploadBox>
              {selectedFiles.video && (
                <Typography variant="caption" style={{ marginTop: '8px' }}>
                  {selectedFiles.video.name}
                </Typography>
              )}
            </Box>
            <Box>
              <UploadBox style={{ border: 'none', borderRadius: '13px', width: '90%' }}>
                <input
                  accept=".pdf, .doc, .docx, .xls, .xlsx, .txt, .ppt, .pptx, .rtf, .csv"
                  style={{ display: 'none' }}
                  id="pdf"
                  type="file"
                  onChange={handleFileUpload}
                  // disabled={!!selectedFiles.zip || !!selectedFiles.video}
                />
                <label
                  htmlFor="pdf"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <img src={PdfIcon} alt="PDF Upload" style={{ width: '80%' }} />
                </label>
              </UploadBox>
              {selectedFiles.pdf && (
                <Typography variant="caption" style={{ marginTop: '8px' }}>
                  {selectedFiles.pdf.name}
                </Typography>
              )}
            </Box>
          </UploadContainer>
        </Grid>
      </Grid>

      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
        disabled={addCourseLoading}
      />
    </FormContainer>
  );
};

AddCourse.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddCourse;
