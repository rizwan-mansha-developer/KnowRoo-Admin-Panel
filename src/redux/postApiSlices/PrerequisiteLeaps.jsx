// src/redux/slices/prerequisiteLeapSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for prerequisiteLeaps
const initialState = {
  prerequisiteLeap: null,
  prerequisiteLeapLoading: false,
  prerequisiteLeapError: null,
  prerequisiteLeapStatus: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const prerequisiteLeap = createAsyncThunk(
  'prerequisiteLeap/prerequisiteLeap',
  async (formData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/create-prerequisite-class', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add prerequisiteLeap');
    }
  }
);

// Create a slice for prerequisiteLeap
const prerequisiteLeapSlice = createSlice({
  name: 'prerequisiteLeap',
  initialState,
  reducers: {
    resetprerequisiteLeapStatus: (state) => {
      state.prerequisiteLeapStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(prerequisiteLeap.pending, (state) => {
        state.prerequisiteLeapLoading = true;
        state.prerequisiteLeapError = null;
        state.prerequisiteLeapStatus = null;
      })
      .addCase(prerequisiteLeap.fulfilled, (state, action) => {
        state.prerequisiteLeap = action.payload;
        state.prerequisiteLeapLoading = false;
        state.prerequisiteLeapStatus = 'success';
      })
      .addCase(prerequisiteLeap.rejected, (state, action) => {
        state.prerequisiteLeapLoading = false;
        state.prerequisiteLeapError = action.error.message;
        state.prerequisiteLeapStatus = 'error';
      });
  },
});

export const { resetprerequisiteLeapStatus } = prerequisiteLeapSlice.actions;
export default prerequisiteLeapSlice.reducer;
