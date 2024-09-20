import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state
const initialState = {
  schools: [], // Assuming you have a list of schools
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
export const deleteSchool = createAsyncThunk(
  'schoolsDelete/deleteSchool',
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      await axiosInstance.delete(`/delete-school/${id}`);
      return id; // Return the school ID on success
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for schools
const schoolDeleteSlice = createSlice({
  name: 'schoolsDelete',
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSchool.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteStatus = 'pending';
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.schools = state.schools.filter((school) => school.id !== action.payload);
        state.deleteStatus = 'succeeded';
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
        state.deleteStatus = 'failed';
      });
  },
});
export const { resetDeleteStatus } = schoolDeleteSlice.actions;
export default schoolDeleteSlice.reducer;
