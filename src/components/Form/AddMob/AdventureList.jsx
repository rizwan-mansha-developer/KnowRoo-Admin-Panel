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
import { fetchAdventure } from '../../../redux/slices/AdventureSlice';
import { fetchAdventureBySchool } from '../../../redux/slices/AdventureBySchoolId';
// import AdventureList from './AdventureList';

const AdventureList = ({ getAdvId }) => {
  const dispatch = useDispatch();
  const {
    adventureBySchool = [],
    loading,
    error,
  } = useSelector((state) => state.adventureBySchool);

  const { adventureId, status } = useSelector((state) => state.addadventure);
  const schoolId = Cookies.get('schoolId');

  const [formData, setFormData] = useState({
    adv_ids: [],
  });
  // const mobId = null
  useEffect(() => {
    dispatch(fetchAdventureBySchool(schoolId));
  }, [dispatch]);

  const handleCheckboxChange = (userId) => {
    getAdvId((prevFormData) => {
      const isSelected = prevFormData.advid.includes(userId);
      const newAdvIds = isSelected
        ? prevFormData.advid.filter((id) => id !== userId)
        : [...prevFormData.advid, userId];

      return { ...prevFormData, advid: newAdvIds };
    });
  };

  return (
    <Grid container spacing={3} style={{ marginBottom: '40px' }}>
      <Grid item xs={12} sm={12}>
        {/* <Grid display="flex" justifyContent="space-between">
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
                    </Grid> */}
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <Alert severity="error">Error: {error}</Alert>
          </Box>
        ) : adventureBySchool?.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body1" color="textSecondary">
              Adventure not available
            </Typography>
          </Box>
        ) : (
          <List
            style={{
              maxHeight: '300px',
              overflow: 'auto',
              background: '#f2f2f7',
              color: '#616161',
              borderRadius: '12px',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {adventureBySchool?.map((adv) => (
              <ListItem
                key={adv.id}
                style={{
                  background: '#fff',
                  margin: '20px 0px',
                  width: '90%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <Checkbox
                  checked={getAdvId?.advi_id?.includes(adv.id)}
                  onChange={() => handleCheckboxChange(adv.id)}
                />
                <ListItemText primary={`${adv.name}`} style={{ marginLeft: '10px' }} />
              </ListItem>
            ))}
          </List>
        )}
        {error && (
          <Typography
            color="error"
            variant="caption"
            display="block"
            style={{ textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

AdventureList.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AdventureList;
