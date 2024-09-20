import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state
const initialState = {
  deleteLeaps: [], // Assuming you have a list of deleteLeaps
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
export const deleteLeaps = createAsyncThunk(
  'deleteLeaps/deleteLeaps',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      await axiosInstance.delete(`/delete-class/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for deleteLeaps
const leapsDeleteSlice = createSlice({
  name: 'deleteLeaps',
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLeaps.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteStatus = 'pending';
      })
      .addCase(deleteLeaps.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteLeaps = state.deleteLeaps.filter((mob) => mob.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteLeaps.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
        state.deleteStatus = 'failed';
      });
  },
});
export const { resetDeleteStatus } = leapsDeleteSlice.actions;
export default leapsDeleteSlice.reducer;
