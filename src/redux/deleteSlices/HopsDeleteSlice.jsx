import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state
const initialState = {
  deleteHops: [], // Assuming you have a list of deleteHops
  deleteLoading: false,
  deleteError: null,
  deleteStatus: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk for deleting a school
export const deleteHops = createAsyncThunk(
  'deleteHopsDelete/deleteHops',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      await axiosInstance.delete(`/delete-module/${id}`);
      return id; // Return the school ID on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for deleteHops
const hopsDeleteSlice = createSlice({
  name: 'deleteHops',
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteHops.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteStatus = 'pending';
      })
      .addCase(deleteHops.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteHops = state.deleteHops.filter((mob) => mob.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteHops.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
        state.deleteStatus = 'failed';
      });
  },
});
export const { resetDeleteStatus } = hopsDeleteSlice.actions;
export default hopsDeleteSlice.reducer;
