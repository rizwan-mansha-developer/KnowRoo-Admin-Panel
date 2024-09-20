// src/redux/slices/checkAssignmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for checkAssignments
const initialState = {
  checkAssignment: null,
  checkAssignmentLoading: false,
  checkAssignmentError: null,
  checkAssignmentstatus: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const checkAssignment = createAsyncThunk(
  'checkAssignment/checkAssignment',
  async (formData) => {
    try {
      console.log('ervnreiu');

      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      console.log('vfkvervnreiu');

      const response = await axiosInstance.post('/submit-assignment-result', formData);
      console.log(response);

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add checkAssignment');
    }
  }
);

// Create a slice for checkAssignment
const checkAssignmentSlice = createSlice({
  name: 'checkAssignment',
  initialState,
  reducers: {
    resetcheckAssignmentStatus: (state) => {
      state.checkAssignmentstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAssignment.pending, (state) => {
        state.checkAssignmentLoading = true;
        state.checkAssignmentError = null;
        state.checkAssignmentstatus = null;
      })
      .addCase(checkAssignment.fulfilled, (state, action) => {
        state.checkAssignment = action.payload;
        state.checkAssignmentLoading = false;
        state.checkAssignmentstatus = 'success';
      })
      .addCase(checkAssignment.rejected, (state, action) => {
        state.checkAssignmentLoading = false;
        state.checkAssignmentError = action.error.message;
        state.checkAssignmentstatus = 'error';
      });
  },
});

export const { resetcheckAssignmentStatus } = checkAssignmentSlice.actions;
export default checkAssignmentSlice.reducer;
