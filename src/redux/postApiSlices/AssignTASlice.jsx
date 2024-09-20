// src/redux/slices/assignTASlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for assignTAs
const initialState = {
  assignTA: null,
  assignTALoading: false,
  assignTAError: null,
  assignTaStatus: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const assignTA = createAsyncThunk('assignTA/assignTA', async (formData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/assign-ta', formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add assignTA');
  }
});

// Create a slice for assignTA
const assignTASlice = createSlice({
  name: 'assignTA',
  initialState,
  reducers: {
    resetassignTaStatus: (state) => {
      state.assignTaStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignTA.pending, (state) => {
        state.assignTALoading = true;
        state.assignTAError = null;
        state.assignTaStatus = null;
      })
      .addCase(assignTA.fulfilled, (state, action) => {
        state.assignTA = action.payload;
        state.assignTALoading = false;
        state.assignTaStatus = 'success';
      })
      .addCase(assignTA.rejected, (state, action) => {
        state.assignTALoading = false;
        state.assignTAError = action.error.message;
        state.assignTaStatus = 'error';
      });
  },
});

export const { resetassignTaStatus } = assignTASlice.actions;
export default assignTASlice.reducer;
