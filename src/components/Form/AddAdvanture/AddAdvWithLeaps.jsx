import React, { useState, useEffect } from 'react';
import { Typography, Grid, Snackbar, CircularProgress, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import SubmitButton from '../../Button/FormButton';
import { FormContainer } from './Style';
import InputField from '../../InputField/Index';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import PropTypes from 'prop-types';
import { addAdventure, resetStatus } from '../../../redux/postApiSlices/AddAdventureSlice';
import { Box, useMediaQuery } from '@mui/system';
import DropdownField from '../../Dropdown/Index';
import { assignAdventure } from '../../../redux/postApiSlices/AssignAdventure';

import { fetchGroups } from '../../../redux/slices/MobSlice';
import AddAssignLeapsInMob from './TabsData';
import { assignLeaps } from '../../../redux/postApiSlices/AssignLeaps';
import Cookies from 'js-cookie';
import { EditIcon, ImagePreview, UploadBox, UploadContainer } from './Stylee';
// import { assignAdventure } from '../../../redux/postApiSlices/AssignAdventureSlice'; // Ensure this slice is set up correctly

import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';

const AddAdventureWithLeaps = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { status, adventureId } = useSelector((state) => state.addadventure);
  const { groups, loading, error } = useSelector((state) => state.groups);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const schoolId = Cookies.get('schoolId');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status_id: '1',
    school_id: schoolId,
  });
  const [selectedMobs, setSelectedMobs] = useState('');
  const [errors, setErrors] = useState({});
  const [leapIds, setLeapIds] = useState({
    leapid: [],
  });

  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const MobsID = Cookies.get('mobs_Id');
  const leapIdsAsIntegers = leapIds?.leapid
    ?.map((id) => {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        console.error(`Invalid ID encountered: ${id}`);
        return null; // You can also handle this by filtering out invalid IDs or throwing an error
      }
      return parsedId;
    })
    .filter((id) => id !== null); // Remove any nulls caused by invalid IDs
  console.log(leapIdsAsIntegers);

  useEffect(() => {
    if (status === 'success') {
      const leapIdsAsIntegers = leapIds.leapid.map((id) => parseInt(id, 10));

      const assignData = {
        subject_ids: [adventureId],
        group_id: MobsID,
      };
      dispatch(assignAdventure(assignData));
      dispatch(
        assignLeaps({
          class_ids: leapIdsAsIntegers,
          subject_id: adventureId,
          group_id: MobsID,
        })
      );

      CloseModal();
      resetFormData();
    }
  }, [status, adventureId, CloseModal, selectedMobs]);
  useEffect(() => {
    dispatch(fetchGroups(schoolId));
  }, []);

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

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      status_id: '1',
    });
    // setSelectedMobs('');
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

  // const handleMobsChange = (e) => {
  //   setSelectedMobs(e.target.value);
  //   if (errors.mobs) {
  //     setErrors({
  //       ...errors,
  //       mobs: '',
  //     });
  //   }
  // };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    // if (!selectedMobs) {
    //   newErrors.mobs = 'This field is required';
    // }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const AdvData = new FormData();
      Object.keys(formData).forEach((key) => AdvData.append(key, formData[key]));
      if (selectedThumbnail) AdvData.append('thumbnail', selectedThumbnail);

      dispatch(addAdventure(AdvData));
    }
  };

  const mobsOptions =
    groups?.length &&
    groups?.map((group) => ({
      label: group.name,
      value: group.id,
    }));

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Adventure</span>
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
          sx={{ backgroundColor: '#f4faf4', border: 'none', p: '3% 23%', borderRadius: '13px' }}
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
                <ImagePreview
                  src={URL.createObjectURL(selectedThumbnail)}
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
        <Grid item xs={12} sm={12}>
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
      <AddAssignLeapsInMob getAdvId={setLeapIds} />

      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddAdventureWithLeaps.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddAdventureWithLeaps;
