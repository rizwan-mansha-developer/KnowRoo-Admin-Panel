import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, CircularProgress, Snackbar, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '../../../assets/FormsIcon/AddIcon.svg';
import SubmitIcon from '../../../assets/FormsIcon/SubmitBtn.svg';
import SubmitButton from '../../Button/FormButton';
import { FormContainer } from './Style';
import InputField from '../../InputField/Index';
import DropdownField from '../../Dropdown/Index';
import CloseIcon from '../../../assets/FormsIcon/CloseIcon.svg';
import { Box, useMediaQuery } from '@mui/system';
import { addHops, resetStatus } from '../../../redux/postApiSlices/AddHopsSlice';
import prerequisiteHopSlice, {
  prerequisiteHop,
} from './../../../redux/postApiSlices/PrerequisiteHop';
import { fetchHops } from '../../../redux/slices/MainHops';

const AddHops = ({ id, CloseModal }) => {
  const dispatch = useDispatch();
  const { hopsData = [], loading, error } = useSelector((state) => state.hops);
  const { hopsId, hopsLoading, status, hopsError } = useSelector((state) => state.addHops);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [selectedHops, setSelectedHops] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prerequisites: '1',
    description: '',
    status_id: '1',
    class_id: id,
  });

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  useEffect(() => {
    fetchHops(id);
  }, [id]);

  useEffect(() => {
    // dispatch(fetchAdventure(MobsID));
    if (status === 'success') {
      dispatch(
        prerequisiteHop({
          class_id: id,
          module_id: hopsId,
          prerequisite_module_id: selectedHops,
        })
      );
    }
  }, [status, id]);

  const handleHopChange = (e) => {
    setSelectedHops(e.target.value);
    if (errors.hop) {
      setErrors({
        ...errors,
        hop: '',
      });
    }
  };
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
      if (formData.prerequisites === 'Required' && selectedHops.length <= 0) {
        newErrors.hop = 'At least one hop must be selected';
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(addHops(formData));
    }
  };

  const handleCloseSnackbar = () => {
    dispatch(resetStatus());
  };

  const HopsOptions =
    hopsData?.length &&
    hopsData?.map((hop) => ({
      label: hop.name,
      value: hop.id,
    }));

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#FFA500', fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}
      >
        <img style={{ marginRight: '10px' }} src={AddIcon} alt="Add Icon" />
        <span>Add Hop</span>
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
            name="prerequisites"
            label="Prerequisites"
            value={formData.prerequisites}
            onChange={handleInputChange}
            error={!!errors.prerequisites}
            helperText={errors.prerequisites}
            options={[
              { label: 'Not Required', value: '0' },
              { label: 'Required', value: '1' },
            ]}
          />
        </Grid>
        {formData.prerequisites == '1' && (
          <Grid item xs={12} sm={12}>
            <DropdownField
              name="hop"
              label="Select Hops"
              value={selectedHops}
              onChange={handleHopChange}
              error={!!errors.hop}
              helperText={errors.hop}
              options={HopsOptions}
            />
          </Grid>
        )}
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
        title="Create"
        backgroundColor="#FFA500"
        boxShadowColor="#D46F1E"
      />
    </FormContainer>
  );
};

AddHops.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default AddHops;
