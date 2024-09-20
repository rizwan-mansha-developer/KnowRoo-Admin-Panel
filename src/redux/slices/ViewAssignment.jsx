// src/redux/slices/viewAssignmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewAssignment
const initialState = {
  viewAssignment: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch viewAssignment data from API
export const fetchviewAssignment = createAsyncThunk(
  'viewAssignment/fetchviewAssignment',
  async (id) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`/assignment/${id}`);

      return response.data.data;
    } catch (error) {
      throw Error('Failed to fetch viewAssignment');
    }
  }
);
// Create a slice for viewAssignment
const viewAssignmentSlice = createSlice({
  name: 'viewAssignment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchviewAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchviewAssignment.fulfilled, (state, action) => {
        state.viewAssignment = action.payload;
        state.loading = false;
      })
      .addCase(fetchviewAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewAssignmentSlice.reducer;
