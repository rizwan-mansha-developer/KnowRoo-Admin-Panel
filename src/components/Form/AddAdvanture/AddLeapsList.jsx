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

import Cookies from 'js-cookie';

import { fetchAdventureBySchool } from '../../../redux/slices/AdventureBySchoolId';
import { fetchLeapsBySchool } from '../../../redux/slices/LeapsBySchool';

const LeapsList = ({ getAdvId }) => {
  const dispatch = useDispatch();
  const { leapsBySchool = [], loading, error } = useSelector((state) => state.leapsBySchool);

  const { adventureId, status } = useSelector((state) => state.addadventure);
  const schoolId = Cookies.get('schoolId');

  const [formData, setFormData] = useState({
    adv_ids: [],
  });
  // const mobId = null
  // console.log(leapsBySchool);

  useEffect(() => {
    dispatch(fetchLeapsBySchool(schoolId));
  }, [dispatch]);

  const handleCheckboxChange = (userId) => {
    const parsedId = parseInt(userId, 10);
    getAdvId((prevFormData) => {
      const isSelected = prevFormData.leapid.includes(parsedId);
      const newleapids = isSelected
        ? prevFormData.leapid.filter((id) => id !== parsedId)
        : [...prevFormData.leapid, parsedId];

      return { ...prevFormData, leapid: newleapids };
    });
  };

  return (
    <Grid container spacing={3} style={{ marginBottom: '40px' }}>
      <Grid item xs={12} sm={12}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <Alert severity="error">Error: {error}</Alert>
          </Box>
        ) : leapsBySchool?.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body1" color="textSecondary">
              Leaps not available
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
            {leapsBySchool?.map((adv) => (
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
                  checked={getAdvId?.leapid?.includes(adv.id)}
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

LeapsList.propTypes = {
  CloseModal: PropTypes.func.isRequired,
};

export default LeapsList;
