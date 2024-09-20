import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box, useMediaQuery, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import zipIcon from '../../../assets/FormsIcon/zip1.svg';
import VideoIcon from '../../../assets/FormsIcon/video.svg';
import PdfIcon from '../../../assets/FormsIcon/pdf.svg';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';

import SubmitButton from '../../Button/FormButton';
import { FormContainer, UploadContainer, UploadBox } from './Style';
import InputField from '../../InputField/Index';
import CustomDatePicker from '../../DatePicker/Index';
import {
  addAssignment,
  resetaddAssignmentStatus,
} from '../../../redux/postApiSlices/AddAssignmentSlice';
import DropdownField from '../../Dropdown/Index';
import Cookies from 'js-cookie';
import extractDate from '../../../utils/formatDateTime';
import DateTimePicker from '../../DatePicker/DateTimePicker';
import extractTime from '../../../utils/formatTime';

const AddAssignment = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    instruction: '',
    description: '',
    format: '',
    accessible: '',
  });
  const HopsId = Cookies.get('hops_Id');
  const UserId = Cookies.get('User_Id');
  const MobsId = Cookies.get('mobs_Id');
  const [errors, setErrors] = useState({});

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { addAssignmentLoading, addAssignmentError, addAssignmentstatus } = useSelector(
    (state) => state.addAssignment
  );
  const [selectedFiles, setSelectedFiles] = useState({
    pic: null,
    video: null,
    pdf: null,
  });
  const [totalPoints, setTotalPoints] = useState('');
  const [passingPoints, setPassingPoints] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if ((name === 'totalPoints' || name === 'passingPoints') && (value < 0 || isNaN(value))) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'totalPoints') {
      setTotalPoints(isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value));
    } else if (name === 'passingPoints') {
      setPassingPoints(isNaN(parseInt(e.target.value)) ? '' : parseInt(e.target.value));
    }
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!totalPoints) {
      newErrors.totalPoints = 'Total Points is required';
    }
    if (!passingPoints) {
      newErrors.passingPoints = 'Passing Points is required';
    }

    if (passingPoints > totalPoints) {
      newErrors.passingPoints = 'Passing Points cannot be greater than Total Points';
    }

    if (!selectedFiles.pic && !selectedFiles.video && !selectedFiles.pdf) {
      newErrors.files = 'At least one file must be uploaded';
    }

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

    if (errors.files) {
      setErrors({
        ...errors,
        files: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const FormateDate = `${extractDate(selectedDate)} ${extractTime(selectedTime)}`;

      const assignmentData = new FormData();
      assignmentData.append('title', formData.title);
      assignmentData.append('description', formData.description);
      assignmentData.append('due_date', FormateDate);
      assignmentData.append('submission_format', formData.format);
      assignmentData.append('instructions', formData.instruction);
      assignmentData.append('accessible', formData.accessible === 'Yes' ? 1 : 0);
      assignmentData.append('user_id', UserId);
      assignmentData.append('group_id', MobsId);
      assignmentData.append('module_id', HopsId);
      assignmentData.append('status_id', 1);
      assignmentData.append('passing_marks', passingPoints);
      assignmentData.append('total_marks', totalPoints);

      if (selectedFiles.pic) {
        assignmentData.append('resource', selectedFiles.pic);
      }
      if (selectedFiles.video) {
        assignmentData.append('resource', selectedFiles.video);
      }
      if (selectedFiles.pdf) {
        assignmentData.append('resource', selectedFiles.pdf);
      }

      dispatch(addAssignment(assignmentData));
    }
  };

  useEffect(() => {
    if (addAssignmentstatus === 'success') {
      CloseModal();
      dispatch(resetaddAssignmentStatus());
      setSelectedFiles();
    }
  }, [addAssignmentstatus, dispatch, CloseModal]);

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Assignment</span>
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
        <Grid item xs={12} sm={7}>
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
        <Grid item xs={12} sm={5}>
          <DateTimePicker
            label="End Date"
            selectedDate={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
            selectedTime={selectedTime}
            onTimeChange={(time) => setSelectedTime(time)}
            pastDate={true}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputField
            name="totalPoints"
            label="Total Points"
            variant="outlined"
            value={totalPoints}
            onChange={handleInputChange}
            error={!!errors.totalPoints}
            helperText={errors.totalPoints}
            placeholder="Total Points"
            // type="number"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputField
            name="passingPoints"
            label="Passing Points"
            variant="outlined"
            // type="number"
            value={passingPoints}
            onChange={handleInputChange}
            error={!!errors.passingPoints}
            helperText={errors.passingPoints}
            placeholder="Passing Points"
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
                  <img src={zipIcon} alt="Zip Upload" style={{ width: '80%' }} />
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
          {errors.files && (
            <Typography variant="caption" color="error" style={{ marginTop: '8px' }}>
              {errors.files}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <DropdownField
            name="format"
            label="Format"
            value={formData.format}
            options={[
              { label: 'Document', value: 'doc' },
              { label: 'Image', value: 'img' },
              { label: 'Video', value: 'vid' },
            ]}
            onChange={handleInputChange}
            error={!!errors.format}
            helperText={errors.format}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="accessible"
            label="Accessible"
            value={formData.accessible}
            options={[
              { label: 'Yes', value: '1' },
              { label: 'No', value: '0' },
            ]}
            onChange={handleInputChange}
            error={!!errors.accessible}
            helperText={errors.accessible}
          />
        </Grid>

        <Grid item xs={12}>
          <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }} htmlFor={name}>
            Instruction
          </label>
          <TextField
            fullWidth
            name="instruction"
            // label="Description"
            variant="outlined"
            value={formData.instruction}
            onChange={handleInputChange}
            // error={!!errors.description}
            // helperText={errors.description}
            placeholder="Enter Instruction"
            multiline
          />
          {errors.instruction && (
            <Typography style={{ color: 'red', marginTop: '1px', fontSize: '12px' }}>
              This field is required
            </Typography>
          )}
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
      <SubmitButton
        icon={SubmitIcon}
        type="submit"
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      >
        <img
          style={{
            marginRight: '10px',
            width: '15px',
            height: '15px',
            position: 'relative',
            top: '-1px',
          }}
          src={SubmitIcon}
          alt="Submit Icon"
        />
        <span style={{ color: 'white', textTransform: 'capitalize' }}>Submit</span>
      </SubmitButton>
    </FormContainer>
  );
};

AddAssignment.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddAssignment;
