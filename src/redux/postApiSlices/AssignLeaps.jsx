// src/redux/slices/assignLeapsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for assignLeapss
const initialState = {
  assignLeaps: null,
  assignLeapsLoading: false,
  assignLeapsError: null,
  status: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const assignLeaps = createAsyncThunk('assignLeaps/assignLeaps', async (formData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/assign-class', formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add assignLeaps');
  }
});

// Create a slice for assignLeaps
const assignLeapsSlice = createSlice({
  name: 'assignLeaps',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignLeaps.pending, (state) => {
        state.assignLeapsLoading = true;
        state.assignLeapsError = null;
        state.status = null;
      })
      .addCase(assignLeaps.fulfilled, (state, action) => {
        state.assignLeaps = action.payload;
        state.assignLeapsLoading = false;
        state.status = 'success';
      })
      .addCase(assignLeaps.rejected, (state, action) => {
        state.assignLeapsLoading = false;
        state.assignLeapsError = action.error.message;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = assignLeapsSlice.actions;
export default assignLeapsSlice.reducer;
