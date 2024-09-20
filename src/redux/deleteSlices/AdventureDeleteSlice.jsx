import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state
const initialState = {
  deleteAdventure: [], // Assuming you have a list of deleteAdventure
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
export const deleteAdventure = createAsyncThunk(
  'deleteAdventure/deleteAdventure',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      await axiosInstance.delete(`/delete-subject/${id}`);
      return id; // Return the school ID on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for deleteAdventure
const advDeleteSlice = createSlice({
  name: 'deleteAdventure',
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdventure.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteStatus = 'pending';
      })
      .addCase(deleteAdventure.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteAdventure = state.deleteAdventure.filter((mob) => mob.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteAdventure.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
        state.deleteStatus = 'failed';
      });
  },
});
export const { resetDeleteStatus } = advDeleteSlice.actions;
export default advDeleteSlice.reducer;
