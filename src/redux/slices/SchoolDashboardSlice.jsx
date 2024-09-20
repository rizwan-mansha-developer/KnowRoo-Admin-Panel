// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  schoolDashbaord: {},
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// const schoolId = Cookies.get('schoolId');
// console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchSchoolDashbaord = createAsyncThunk(
  'schoolDashbaord/fetchSchoolDashbaord',
  async (date) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`school-admin-dashboard?${date}`);
      console.log(response);

      return response.data.data.school;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch Adventure');
    }
  }
);

// Create a slice for groups
const schoolDashbaordSlice = createSlice({
  name: 'schoolDashbaord',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolDashbaord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolDashbaord.fulfilled, (state, action) => {
        state.schoolDashbaord = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchoolDashbaord.rejected, (state, action) => {
        state.schoolDashbaord = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default schoolDashbaordSlice.reducer;
