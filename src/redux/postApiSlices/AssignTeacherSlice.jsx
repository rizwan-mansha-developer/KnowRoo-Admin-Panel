// src/redux/slices/assignTeacherToMobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for assignTeacherToMobs
const initialState = {
  assignTeacherToMob: null,
  assignTeacherToMobLoading: false,
  assignTeacherToMobError: null,
  assignTeacherstatus: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const assignTeacherToMob = createAsyncThunk(
  'assignTeacherToMob/assignTeacherToMob',
  async (formData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/assign-teacher', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add assignTeacherToMob');
    }
  }
);

// Create a slice for assignTeacherToMob
const assignTeacherToMobSlice = createSlice({
  name: 'assignTeacherToMob',
  initialState,
  reducers: {
    resetassignTeacherStatus: (state) => {
      state.assignTeacherstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignTeacherToMob.pending, (state) => {
        state.assignTeacherToMobLoading = true;
        state.assignTeacherToMobError = null;
        state.assignTeacherstatus = null;
      })
      .addCase(assignTeacherToMob.fulfilled, (state, action) => {
        state.assignTeacherToMob = action.payload;
        state.assignTeacherToMobLoading = false;
        state.assignTeacherstatus = 'success';
      })
      .addCase(assignTeacherToMob.rejected, (state, action) => {
        state.assignTeacherToMobLoading = false;
        state.assignTeacherToMobError = action.error.message;
        state.assignTeacherstatus = 'error';
      });
  },
});

export const { resetassignTeacherStatus } = assignTeacherToMobSlice.actions;
export default assignTeacherToMobSlice.reducer;
