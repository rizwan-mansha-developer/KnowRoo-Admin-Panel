// src/redux/slices/assignAdventureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for assignAdventures
const initialState = {
  assignAdv: null,
  assignAdvLoading: false,
  assignAdvError: null,
  status: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token; // Replace with actual token retrieval logic if needed
};

// Define the async thunk to post data to API
export const assignAdventure = createAsyncThunk(
  'assignAdventure/assignAdventure',
  async (formData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/assign-subject', formData);
      console.log(response);

      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data.message
        : new Error('Failed to add assignAdventure');
    }
  }
);

// Create a slice for assignAdventure
const assignAdventureSlice = createSlice({
  name: 'assignAdventure',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignAdventure.pending, (state) => {
        state.assignAdvLoading = true;
        state.assignAdvError = null;
        state.status = null;
      })
      .addCase(assignAdventure.fulfilled, (state, action) => {
        state.assignAdv = action.payload;
        state.assignAdvLoading = false;
        state.status = 'success';
      })
      .addCase(assignAdventure.rejected, (state, action) => {
        state.assignAdvLoading = false;
        state.assignAdvError = action.error.message;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = assignAdventureSlice.actions;
export default assignAdventureSlice.reducer;
