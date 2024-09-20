import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Grid,
  Divider,
  Snackbar,
  CircularProgress,
  useMediaQuery,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Switch,
  Avatar,
} from '@mui/material';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import SubmitButton from '../../Button/FormButton';
import {
  FormContainer,
  UploadBox,
  UploadContainer,
  ImagePreview,
  ErrorText,
  EditIcon,
} from './Style';
import InputField from '../../InputField/Index';
import DropdownField from '../../Dropdown/Index';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addLeaps, resetaddStatus } from '../../../redux/postApiSlices/AddLeapsSlice';
import { fetchAdventure } from '../../../redux/slices/AdventureSlice';
// import { schoolId } from '../../../utils/reuseableId';
// import { assignLeaps } from '../../../redux/postApiSlices/AssignLeaps';
import Advanture from './../../../pages/Advanture/Advanture';
import { assignLeaps } from './../../../redux/postApiSlices/AssignLeaps';
import Cookies from 'js-cookie';
import { fetchuserByMob } from '../../../redux/slices/UserByMobSlice';
import { Img_BASE_URL } from '../../../config/apiConfig';
import { assignTA } from '../../../redux/postApiSlices/AssignTASlice';
import { fetchViewMobs } from '../../../redux/slices/ViewMobs';
import { prerequisiteLeap } from '../../../redux/postApiSlices/PrerequisiteLeaps';
import { fetchLeaps } from '../../../redux/slices/LeapsSlice';

const AddLeapsAssignLeaps = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.leaps);
  const { addStatus } = useSelector((state) => state.addleaps);
  // const { adventure = [], loading, error } = useSelector((state) => state.adventure);
  const { viewMobs, loading, error } = useSelector((state) => state.viewMobs);
  const schoolId = Cookies.get('schoolId');
  const IsTeacher = Cookies.get('is_teacher');
  const leapsId = useSelector((state) => state.addleaps.leapsId);
  const { leaps = [] } = useSelector((state) => state.leaps);
  const { userByMob = [] } = useSelector((state) => state.userByMob);
  const MobsID = Cookies.get('mobs_Id');
  const AdvId = Cookies.get('adv_Id');
  const AdventureId = Cookies.get('adv_Id');
  const roleId = parseInt(Cookies.get('role_id'));
  // const { leapsId } = useSelector((state) => state.addLeaps);
  const [formData, setFormData] = useState({
    name: '',
    prerequisite: 'Required',
    description: '',
    status_id: '1',
    school_id: schoolId,
  });

  const [errors, setErrors] = useState({});
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedAdventure, setSelectedAdventure] = useState('');

  const [selectedLeaps, setSelectedLeaps] = useState([]);

  const [teacherIds, setTeacherIds] = useState([]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [toggleStates, setToggleStates] = useState([]);
  const [teacherToggle, setTeacherToggle] = useState([]);
  const [assignTa, setAssignTa] = useState([]);
  const [teacherErrors, setTeacherErrors] = useState('');
  useEffect(() => {
    dispatch(fetchAdventure(MobsID));
    dispatch(fetchuserByMob(MobsID));
    dispatch(fetchViewMobs(MobsID));
    dispatch(fetchLeaps(AdventureId));
  }, [MobsID, dispatch]);

  useEffect(() => {
    // dispatch(fetchAdventure(MobsID));
    if (addStatus === 'success') {
      dispatch(
        assignLeaps({
          class_ids: [leapsId],
          subject_id: AdvId,
          group_id: MobsID,
          teacher_ids: teacherIds,
        })
      );
      dispatch(
        prerequisiteLeap({
          class_id: leapsId,
          subject_id: AdventureId,
          group_id: MobsID,
          prerequisite_class_id: selectedLeaps,
        })
      );
      const AssignTA = {
        user_ids: assignTa,
        class_id: leapsId,
        group_id: MobsID,
        subject_id: AdvId,
      };
      dispatch(assignTA(AssignTA));
      CloseModal();
      resetFormData();
      resetaddStatus();
    }
  }, [status, leapsId, CloseModal, selectedAdventure]);

  const resetFormData = () => {
    setFormData({
      name: '',
      prerequisite: '1',
      // class_capacity: '',
      description: '',
      status_id: '1',
    });
    setSelectedThumbnail(null);
    setErrors({});
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
  const handleAdvChange = (e) => {
    setSelectedAdventure(e.target.value);
    if (errors.adv) {
      setErrors({
        ...errors,
        adv: '',
      });
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

      setAssignTa((prevFormData) => {
        const newUserIds = newToggleState
          ? [...(prevFormData || []), userId] // Add user ID if toggle is true
          : (prevFormData || []).filter((id) => id !== userId); // Remove user ID if toggle is false

        return newUserIds; // Return only the array of integers
      });

      return {
        ...prevToggleStates,
        [userId]: newToggleState,
      };
    });
  };

  const handleTeacherToggleChange = (userId) => {
    setTeacherToggle((prevToggleStates) => {
      const newToggleState = !prevToggleStates[userId];

      setTeacherIds((prevFormData) => {
        const newUserIds = newToggleState
          ? [...(prevFormData || []), userId] // Add user ID if toggle is true
          : (prevFormData || []).filter((id) => id !== userId); // Remove user ID if toggle is false

        return newUserIds; // Return only the array of integers
      });

      return {
        ...prevToggleStates,
        [userId]: newToggleState,
      };
    });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = 'This field is required';
    });
    if (formData.prerequisite === 'Required' && selectedLeaps.length <= 0) {
      newErrors.leap = 'At least one leap must be selected';
    }

    if (!selectedThumbnail) newErrors.thumbnail = 'Thumbnail is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the class_capacity field is being updated, ensure it's a number
    // if (name === 'class_capacity') {
    //   const parsedValue = parseInt(value, 10);
    //   if (value === '') {
    //     // Allow clearing the input by setting form data to an empty string
    //     setFormData((prev) => ({ ...prev, [name]: '' }));
    //     setErrors((prev) => ({ ...prev, [name]: '' }));
    //     return;
    //   }

    //   // if (isNaN(parsedValue) || parsedValue <= 0) {
    //   //   setErrors((prev) => ({
    //   //     ...prev,
    //   //     [name]: 'Class Capacity must be a positive integer greater than 0',
    //   //   }));
    //   //   return;
    //   // }
    // }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleLeapChange = (e) => {
    setSelectedLeaps(e.target.value);
    if (errors.leap) {
      setErrors({
        ...errors,
        leap: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if ((roleId === 1 || roleId === 2) && teacherIds.length === 0) {
      setTeacherErrors('This field is required.');
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const leapsData = new FormData();
      Object.keys(formData).forEach((key) => leapsData.append(key, formData[key]));
      if (selectedThumbnail) leapsData.append('thumbnail', selectedThumbnail);
      dispatch(addLeaps(leapsData));
    }
  };
  // const AdvantureOptions = adventure?.map((adv) => ({
  //   label: adv.name,
  //   value: adv.id,
  // }));

  const LeapsOptions =
    leaps?.length &&
    leaps?.map((leap) => ({
      label: leap.name,
      value: leap.id,
    }));

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Leaps</span>
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

      <Grid container spacing={3} sx={{ mb: '40px' }}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <DropdownField
            name="prerequisite"
            label="Prerequisite"
            value={formData.prerequisite}
            onChange={handleInputChange}
            error={!!errors.prerequisite}
            helperText={errors.prerequisite}
            options={['Not Required', 'Required']}
          />
        </Grid>

        {formData.prerequisite == 'Required' && (
          <Grid item xs={12} sm={12}>
            <DropdownField
              name="leap"
              label="Select Leaps"
              value={selectedLeaps}
              onChange={handleLeapChange}
              error={!!errors.leep}
              helperText={errors.leap}
              options={LeapsOptions}
            />
          </Grid>
        )}

        {/* <Grid item xs={12} sm={6}>
          <InputField
            name="class_capacity"
            label="Leaps Capacity"
            variant="outlined"
            value={formData.class_capacity}
            onChange={handleInputChange}
            error={!!errors.class_capacity}
            helperText={errors.class_capacity}
            placeholder="Enter Leaps Capacity"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
            <DropdownField
              name="adv"
              label="Select Adventure"
              value={selectedAdventure}
              onChange={handleAdvChange}
              error={!!errors.adv}
              helperText={errors.adv}
              options={AdvantureOptions}
            />
          </Grid> */}

        <Grid item xs={12}>
          <InputField
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            placeholder="Enter description"
            multiline
          />
        </Grid>
        {roleId === 1 || roleId === 2 ? (
          <Grid item xs={12} sm={12}>
            <Grid display="flex" justifyContent="space-between">
              <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
                {' '}
                Assign Leaps To Teacher{' '}
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
            ) : viewMobs.teachers?.length === 0 ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="body1" color="textSecondary">
                  Teacher not available
                </Typography>
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
                {viewMobs.teachers?.map((user) => (
                  <ListItem
                    key={user.id}
                    style={{
                      background: '#fff',
                      margin: '20px 0px',
                      padding: '10px 20px',
                      width: '90%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <Avatar src={`${Img_BASE_URL}/${user.profile_picture}`} />
                    <ListItemText
                      primary={`${user.fname} ${user.lname}`}
                      style={{ marginLeft: '10px' }}
                    />
                    {
                      <Switch
                        checked={teacherToggle[user.user_id] || false}
                        onChange={() => handleTeacherToggleChange(user.user_id)}
                        inputProps={{ 'aria-label': 'toggle visibility' }}
                      />
                    }
                  </ListItem>
                ))}
              </List>
            )}
            {teacherErrors && (
              <Typography
                color="error"
                variant="caption"
                display="block"
                style={{ textAlign: 'center' }}
              >
                {teacherErrors}
              </Typography>
            )}
          </Grid>
        ) : null}
        <Grid item xs={12} sm={12}>
          <Grid display="flex" justifyContent="space-between">
            <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
              {' '}
              Assign TA
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
          ) : userByMob.length === 0 ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="body1" color="textSecondary">
                Knowroos not available
              </Typography>
            </Box>
          ) : (
            <List
              style={{
                maxHeight: '320px',
                overflow: 'auto',
                background: '#f2f2f7',
                borderRadius: '12px',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {userByMob &&
                (userByMob.filter((user) => {
                  return !(
                    user.role_id === 1 ||
                    user.role_id === 2 ||
                    user.role_id === 3 ||
                    user.is_teacher === true
                  );
                }).length > 0 ? (
                  userByMob
                    .filter((user) => {
                      return !(
                        user.role_id === 1 ||
                        user.role_id === 2 ||
                        user.role_id === 3 ||
                        user.is_teacher === true
                      );
                    })
                    .map((user) => (
                      <ListItem
                        key={user.id}
                        style={{
                          background: '#fff',
                          margin: '20px 10px',
                          padding: '10px 20px',
                          width: '90%',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      >
                        <Avatar src={`${Img_BASE_URL}/${user.profile_picture}`} />
                        <ListItemText
                          primary={`${user.fname} ${user.lname}`}
                          style={{ marginLeft: '10px' }}
                        />
                        <Switch
                          checked={toggleStates[user.id] || false}
                          onChange={() => handleToggleChange(user.id)}
                          inputProps={{ 'aria-label': 'toggle visibility' }}
                        />
                      </ListItem>
                    ))
                ) : (
                  // <ListItemText variant="body1" color="textSecondary" style={{ marginLeft: '10px' }} >
                  //   Knowroos not available
                  //       </ListItemText>

                  <ListItemText primary={` Knowroos not available`} style={{ margin: '15px' }} />
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
      <Divider />
      <SubmitButton
        icon={SubmitIcon}
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddLeapsAssignLeaps.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddLeapsAssignLeaps;
