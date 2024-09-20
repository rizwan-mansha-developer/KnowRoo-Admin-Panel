import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for addAssignment
const initialState = {
  assignmentData: null,
  addAssignmentLoading: false,
  addAssignmentError: null,
  addAssignmentstatus: null,
};

// Function to get token from config
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addAssignment = createAsyncThunk(
  'addAssignment/addAssignment',
  async (assignmentData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/create-assignment', assignmentData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add questionnaire');
    }
  }
);

// Create a slice for addAssignment
const addAssignmentSlice = createSlice({
  name: 'addAssignment',
  initialState,
  reducers: {
    resetaddAssignmentStatus: (state) => {
      state.addAssignmentstatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAssignment.pending, (state) => {
        state.addAssignmentLoading = true;
        state.addAssignmentError = null;
        state.addAssignmentstatus = 'loading';
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.addAssignmentLoading = false;
        state.assignmentData = action.payload;
        state.addAssignmentstatus = 'success';
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.addAssignmentLoading = false;
        state.addAssignmentError = action.error.message;
        state.addAssignmentstatus = 'error';
      });
  },
});

// Export actions and reducer
export const { resetaddAssignmentStatus } = addAssignmentSlice.actions;
export default addAssignmentSlice.reducer;
