// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  groups: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchSchools = createAsyncThunk('schools/fetchSchools', async () => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get('/view-all-schools');

    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch schools');
  }
});

// Create a slice for groups
const schoolsSlice = createSlice({
  name: 'schools',
  initialState: {
    schools: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.schools = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.schools = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default schoolsSlice.reducer;
