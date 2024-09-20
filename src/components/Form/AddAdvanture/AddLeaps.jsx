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
  Alert,
  TextField,
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
} from './Stylee';
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
import { prerequisiteLeap } from '../../../redux/postApiSlices/PrerequisiteLeaps';
import { fetchLeaps } from '../../../redux/slices/LeapsSlice';

const AddLeapsInAdv = ({ CloseModal }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.leaps);
  const { addStatus, leapsLoading } = useSelector((state) => state.addleaps);
  const { adventure = [] } = useSelector((state) => state.adventure);
  const { leaps = [], loading, error } = useSelector((state) => state.leaps);
  const schoolId = Cookies.get('schoolId');
  const leapsId = useSelector((state) => state.addleaps.leapsId);
  const { userByMob = [] } = useSelector((state) => state.userByMob);
  const MobsID = Cookies.get('mobs_Id');
  const AdventureId = Cookies.get('adv_Id');
  // const { leapsId } = useSelector((state) => state.addLeaps);
  const [formData, setFormData] = useState({
    name: '',
    prerequisite: 'Not Required',
    // class_capacity: '',
    description: '',
    status_id: '1',
    school_id: schoolId,
  });

  const [errors, setErrors] = useState({});
  const [selectedLeapThumbnail, setSelectedLeapThumbnail] = useState(null);
  const [selectedLeaps, setSelectedLeaps] = useState([]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [toggleStates, setToggleStates] = useState([]);
  const [assignTa, setAssignTa] = useState([]);

  useEffect(() => {
    dispatch(fetchLeaps(AdventureId));
    dispatch(fetchuserByMob(MobsID));
  }, []);

  useEffect(() => {
    // dispatch(fetchAdventure(MobsID));
    if (addStatus === 'success') {
      const AssignTA = {
        user_ids: assignTa,
        class_id: leapsId,
        group_id: MobsID,
        subject_id: AdventureId,
      };
      dispatch(assignTA(AssignTA));
      // dispatch(
      //   prerequisiteLeap({
      //     class_id: leapsId,
      //     subject_id: AdventureId,
      //     group_id: MobsID,
      //     prerequisite_class_id: selectedLeaps
      //   })
      // );
      // CloseModal();
      resetFormData();
      resetaddStatus();
    }
  }, [status, leapsId, CloseModal]);

  const resetFormData = () => {
    setFormData({
      name: '',
      prerequisite: '1',
      description: '',
      status_id: '1',
    });
    setSelectedLeapThumbnail(null);
    setErrors({});
  };

  const handleLeapFileUpload = (e) => {
    const file = e.target.files[0];
    e.stopPropagation();
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, thumbnail: 'Please select an Thumbnail below 2MB' }));
        setSelectedLeapThumbnail(null);
      } else {
        setSelectedLeapThumbnail(file);
        setErrors((prev) => ({ ...prev, thumbnail: '' }));
      }
    }
  };

  const handleToggleChange = (userId) => {
    setToggleStates((prevToggleStates) => {
      const newToggleState = !prevToggleStates[userId];

      setAssignTa((prevFormData) => {
        const newUserIds = newToggleState
          ? [...(prevFormData || []), userId]
          : (prevFormData || []).filter((id) => id !== userId);

        return newUserIds;
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
    // if (formData.prerequisite === 'Required' && selectedLeaps.length <= 0) {
    //   newErrors.leap = 'At least one leap must be selected';
    // }
    if (!selectedLeapThumbnail) newErrors.thumbnail = 'Thumbnail is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  const handleLeapChange = (e) => {
    setSelectedLeaps(e.target.value);
    //   if (errors.leap) {
    //     setErrors({
    //       ...errors,
    //       leap: '',
    //     });
    //   }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const leapsData = new FormData();
      Object.keys(formData).forEach((key) => leapsData.append(key, formData[key]));
      if (selectedLeapThumbnail) leapsData.append('thumbnail', selectedLeapThumbnail);
      dispatch(addLeaps(leapsData));
    }
  };
  const LeapsOptions =
    leaps?.length &&
    leaps?.map((leap) => ({
      label: leap.name,
      value: leap.id,
    }));

  return (
    <>
      <UploadContainer>
        <UploadBox
          sx={{ backgroundColor: '#f4faf4', border: 'none', p: '3% 1%', borderRadius: '13px' }}
        >
          <input
            accept=".png,.jpg"
            style={{ display: 'none' }}
            id="leapthumbnail-upload"
            type="file"
            onChange={handleLeapFileUpload}
          />

          <label
            htmlFor="leapthumbnail-upload"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {selectedLeapThumbnail ? (
              <>
                <ImagePreview
                  src={URL.createObjectURL(selectedLeapThumbnail)}
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
        {/* {formData.prerequisite == "Required" &&
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
        } */}
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
          ) : userByMob?.length === 0 ? (
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

      <SubmitButton
        onClick={handleSubmit}
        // icon={SubmitIcon}
        title="Add Leaps"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
        loading={leapsLoading}
      />
    </>
  );
};

AddLeapsInAdv.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddLeapsInAdv;
