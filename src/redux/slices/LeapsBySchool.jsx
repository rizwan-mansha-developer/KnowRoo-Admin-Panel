// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  leapsBySchool: [],
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
export const fetchLeapsBySchool = createAsyncThunk(
  'leapsBySchool/fetchLeapsBySchool',
  async (schoolId) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }

      const response = await axiosInstance.get(`view-all-classes-against-school/${schoolId}`);
      // console.log(responce);

      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch LeapsBySchool');
    }
  }
);
// Create a slice for groups
const leapsBySchoolSlice = createSlice({
  name: 'leapsBySchool',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeapsBySchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeapsBySchool.fulfilled, (state, action) => {
        state.leapsBySchool = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeapsBySchool.rejected, (state, action) => {
        state.leapsBySchool = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leapsBySchoolSlice.reducer;
