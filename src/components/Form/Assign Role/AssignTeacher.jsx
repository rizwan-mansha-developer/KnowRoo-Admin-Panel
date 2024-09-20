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
} from '@mui/material';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import CameraIcon from '../../../assets/FormsIcon/Camera.svg';
import Editicon from '../../../assets/FormsIcon/edit.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import SubmitButton from '../../Button/FormButton';
import { FormContainer } from './Style';
import InputField from '../../InputField/Index';
import DropdownField from '../../Dropdown/Index';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAdventure } from '../../../redux/slices/AdventureSlice';
import { MobsID, schoolId } from '../../../utils/reuseableId';

import Cookies from 'js-cookie';
import { fetchuserByMob } from '../../../redux/slices/UserByMobSlice';
import { Img_BASE_URL } from '../../../config/apiConfig';
import { assignTeacherToMob } from '../../../redux/postApiSlices/AssignTeacherSlice';
import Loader from '../../Skeleton/Loader';

const AssignTeacher = ({ id, CloseModal }) => {
  const dispatch = useDispatch();

  const { assignTeacherToMobLoading, assignTeacherToMobError, assignTeacherstatus } = useSelector(
    (state) => state.assignTeacherToMob
  );

  const { userByMob = [], loading, error } = useSelector((state) => state.userByMob);

  const [toggleStates, setToggleStates] = useState([]);
  const [assignTeacher, setAssignTeacher] = useState([]);
  const [formData, setFormData] = useState({
    user_ids: [],
    group_id: id,
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchuserByMob(id));
  }, [dispatch]);

  useEffect(() => {
    if (assignTeacherstatus === 'success') {
      CloseModal();
      resetFormData();
    } else if (assignTeacherToMobError) {
      setSnackbarOpen(true);
    }
  }, [assignTeacherstatus]);

  const resetFormData = () => {
    setFormData({
      user_ids: '',
    });
    setErrors({});
  };

  const handleToggleChange = (userId) => {
    setToggleStates((prevToggleStates) => {
      const newToggleState = !prevToggleStates[userId];

      setAssignTeacher((prevFormData) => {
        const newUserIds = newToggleState
          ? [...(prevFormData || []), userId]
          : (prevFormData || []).filter((id) => id !== userId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          user_ids: newUserIds,
        }));
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const assignData = new FormData();
      assignData.append('group_id', formData.group_id);
      formData.user_ids.forEach((userId, index) => {
        assignData.append(`user_ids[${index}]`, userId);
      });
      dispatch(assignTeacherToMob(assignData));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <span> Assign Teacher </span>
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

      <Grid container spacing={3} sx={{ mb: '40px' }}>
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
              Assign Teacher
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
                maxHeight: '320px',
                overflow: 'auto',
                background: '#f2f2f7',
                borderRadius: '12px',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {userByMob
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
    </FormContainer>
  );
};

AssignTeacher.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AssignTeacher;
