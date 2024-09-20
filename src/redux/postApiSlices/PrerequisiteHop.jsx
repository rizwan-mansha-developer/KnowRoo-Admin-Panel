// src/redux/slices/prerequisiteHopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for prerequisiteHops
const initialState = {
  prerequisiteHop: null,
  prerequisiteHopLoading: false,
  prerequisiteHopError: null,
  prerequisiteHopStatus: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const prerequisiteHop = createAsyncThunk(
  'prerequisiteHop/prerequisiteHop',
  async (formData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/create-module-prerequisite', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to add prerequisiteHop');
    }
  }
);

// Create a slice for prerequisiteHop
const prerequisiteHopSlice = createSlice({
  name: 'prerequisiteHop',
  initialState,
  reducers: {
    resetprerequisiteHopStatus: (state) => {
      state.prerequisiteHopStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(prerequisiteHop.pending, (state) => {
        state.prerequisiteHopLoading = true;
        state.prerequisiteHopError = null;
        state.prerequisiteHopStatus = null;
      })
      .addCase(prerequisiteHop.fulfilled, (state, action) => {
        state.prerequisiteHop = action.payload;
        state.prerequisiteHopLoading = false;
        state.prerequisiteHopStatus = 'success';
      })
      .addCase(prerequisiteHop.rejected, (state, action) => {
        state.prerequisiteHopLoading = false;
        state.prerequisiteHopError = action.error.message;
        state.prerequisiteHopStatus = 'error';
      });
  },
});

export const { resetprerequisiteHopStatus } = prerequisiteHopSlice.actions;
export default prerequisiteHopSlice.reducer;
