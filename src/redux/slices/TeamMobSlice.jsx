// src/redux/slices/teamMobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for teamMobs
const initialState = {
  teamMobs: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

const schoolId = Cookies.get('schoolId');
console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchTeamMobs = createAsyncThunk('teamMobs/fetchTeamMobs', async (id = null) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    let response;
    if (id) {
      // Fetch a specific group by ID
      response = await axiosInstance.get(`/teamMobs-against-school/${id}`);
    } else {
      // Fetch all teamMobs
      response = await axiosInstance.get(`/teamMobs-against-school/${schoolId}`);
    }
    return response.data.teamMobs;
  } catch (error) {
    throw Error('Failed to fetch teamMobs');
  }
});

// Create a slice for teamMobs
const teamMobsSlice = createSlice({
  name: 'teamMobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMobs.fulfilled, (state, action) => {
        state.teamMobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamMobs.rejected, (state, action) => {
        state.teamMobs = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default teamMobsSlice.reducer;
