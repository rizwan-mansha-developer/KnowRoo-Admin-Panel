import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state
const initialState = {
  deleteMobs: [], // Assuming you have a list of deleteMobs
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
export const deleteMobs = createAsyncThunk(
  'deleteMobsDelete/deleteMobs',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      await axiosInstance.delete(`/delete-group/${id}`);
      return id; // Return the school ID on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for deleteMobs
const mobDeleteSlice = createSlice({
  name: 'deleteMobs',
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteMobs.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteStatus = 'pending';
      })
      .addCase(deleteMobs.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteMobs = state.deleteMobs.filter((mob) => mob.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteMobs.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
        state.deleteStatus = 'failed';
      });
  },
});
export const { resetDeleteStatus } = mobDeleteSlice.actions;
export default mobDeleteSlice.reducer;
