import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material';
import { Box, useMediaQuery } from '@mui/system';
import styled from 'styled-components';
import InputField from '../../InputField/Index'; // Adjust the path as necessary
import NextIcon from '../../../assets/FormsIcon/Graterthen.svg';
import PreviousIcon from '../../../assets/FormsIcon/Lessthen.svg';
import { Img_BASE_URL } from '../../../config/apiConfig';

const AddTeam = ({ user, UserForTeam, loading, error, formData, setFormData, teacherId }) => {
  const [currentTeam, setCurrentTeam] = useState(1);
  const [totalTeam, setTotalTeam] = useState(1);
  const [teams, setTeams] = useState([{ team_name: '', user_ids: [] }]);
  const [errors, setErrors] = useState({
    teamNameError: false,
    user_ids: false,
  });

  const IsMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    setFormData({ ...formData, team_groups: teams }); // Keep formData updated with the latest team groups
  }, [teams]);

  const handleAddTeam = () => {
    const currentTeamIndex = currentTeam - 1;
    const currentTeamData = teams[currentTeamIndex];

    if (!currentTeamData.team_name.trim()) {
      setErrors({ ...errors, teamNameError: true });
      return;
    }
    if (currentTeamData.user_ids.length === 0) {
      setErrors({ ...errors, user_ids: 'At least one user must be selected' });
      return;
    }

    setErrors({ teamNameError: false, user_ids: false });
    setTeams([...teams, { team_name: '', user_ids: [] }]);
    setTotalTeam(totalTeam + 1);
    setCurrentTeam(teams.length + 1);
  };

  const handleNextTeam = () => {
    const currentTeamIndex = currentTeam - 1;
    const currentTeamData = teams[currentTeamIndex];

    if (!currentTeamData.team_name.trim()) {
      setErrors({ ...errors, teamNameError: true });
      return;
    }
    if (currentTeamData.user_ids.length === 0) {
      setErrors({ ...errors, user_ids: 'At least one user must be selected' });
      return;
    }

    setErrors({ teamNameError: false, user_ids: false });
    if (currentTeam < totalTeam) {
      setCurrentTeam(currentTeam + 1);
    }
  };

  const handlePreviousTeam = () => {
    if (currentTeam > 1) {
      setCurrentTeam(currentTeam - 1);
    }
  };

  const handleTeamNameChange = (e, index) => {
    const newTeams = [...teams];
    newTeams[index].team_name = e.target.value;
    if (e.target.value.trim()) {
      setErrors({ ...errors, teamNameError: false });
    }
    setTeams(newTeams);
  };

  const handleCheckboxChange = (userId) => {
    const newTeams = [...teams];
    const currentTeamIndex = currentTeam - 1;
    const isSelected = newTeams[currentTeamIndex].user_ids.includes(userId);

    if (isSelected) {
      newTeams[currentTeamIndex].user_ids = newTeams[currentTeamIndex].user_ids.filter(
        (id) => id !== userId
      );
    } else {
      newTeams[currentTeamIndex].user_ids.push(userId);
    }

    setTeams(newTeams);
  };
  return (
    <Grid container spacing={3} style={{ marginBottom: '40px' }}>
      <Grid item xs={12} sm={12}>
        <FormGroup style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navigation>
            <Button
              style={{ background: 'none' }}
              onClick={handlePreviousTeam}
              disabled={currentTeam === 1}
            >
              <img src={PreviousIcon} alt="Previous" />
            </Button>
            <Typography>{`Team ${currentTeam}/${totalTeam}`}</Typography>
            <Button
              style={{ background: 'none' }}
              onClick={handleNextTeam}
              disabled={currentTeam === totalTeam}
            >
              <img src={NextIcon} alt="Next" />
            </Button>
          </Navigation>

          <Button
            onClick={handleAddTeam}
            style={{
              color: '#03A9F4',
              height: '20px',
              fontSize: IsMobile ? '9px' : '12px',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
            }}
          >
            Add team
          </Button>
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box style={{ backgroundColor: '#F4F4F6', borderRadius: '14px' }} px={2} pb={5}>
          <Grid container spacing={2}>
            {/* Team Name Input Field */}
            <Grid item xs={12}>
              <InputField
                name={`teamName-${currentTeam}`}
                label={`Team ${currentTeam} Name`}
                variant="outlined"
                value={teams[currentTeam - 1].team_name}
                onChange={(e) => handleTeamNameChange(e, currentTeam - 1)}
                error={errors.teamNameError}
                helperText={errors.teamNameError ? 'This field is required' : ''}
                placeholder="Enter Team Name"
                backgroundColor="#fff"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid display="flex" justifyContent="space-between">
                <label style={{ fontSize: '16px', fontWeight: 'bold', color: '#616161' }}>
                  Select Knowroos
                </label>
              </Grid>
              {loading ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography variant="body1" color="error">
                    Error: {error}
                  </Typography>
                </Box>
              ) : user?.length === 0 ? (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Typography variant="body1" color="textSecondary">
                    No users available
                  </Typography>
                </Box>
              ) : (
                <List
                  style={{
                    maxHeight: '300px',
                    overflow: 'auto',
                    background: '#f2f2f7',
                    borderRadius: '12px',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {user
                    ?.filter((user) => user.role_id !== 1 && user.role_id !== 2)
                    ?.filter((user) => UserForTeam.includes(user.id))
                    ?.filter((user) => !teacherId.includes(user.id))
                    ?.filter((user) => {
                      const assignedUserIds = teams
                        .filter((_, index) => index !== currentTeam - 1)
                        .flatMap((team) => team.user_ids);
                      return !assignedUserIds.includes(user.id);
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
                        <Checkbox
                          checked={teams[currentTeam - 1].user_ids.includes(user.id)}
                          onChange={() => handleCheckboxChange(user.id)}
                        />
                        <Avatar src={`${Img_BASE_URL}/${user.profile_picture}`} />
                        <ListItemText
                          primary={`${user.fname} ${user.lname}`}
                          style={{ marginLeft: '10px' }}
                        />
                      </ListItem>
                    ))}

                  {user
                    ?.filter((user) => user.role_id !== 1 && user.role_id !== 2)
                    ?.filter((user) => UserForTeam.includes(user.id))
                    ?.filter((user) => !teacherId.includes(user.id))
                    ?.filter((user) => {
                      const assignedUserIds = teams
                        .filter((_, index) => index !== currentTeam - 1)
                        .flatMap((team) => team.user_ids);
                      return !assignedUserIds.includes(user.id);
                    }).length === 0 && (
                    <Typography variant="body1" color="textSecondary" align="center">
                      Knowroos are not available
                    </Typography>
                  )}
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
        </Box>
      </Grid>
    </Grid>
  );
};

AddTeam.propTypes = {
  user: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

// Styled components
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default AddTeam;
