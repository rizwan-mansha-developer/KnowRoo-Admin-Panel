// src/redux/slices/schoolSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

// Define the initial state for schools
const initialState = {
  schoolData: null,
  addSchoolsloading: false,
  addSchoolserror: null,
  status: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addSchool = createAsyncThunk('school/addSchool', async (schoolData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-school', schoolData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add school');
  }
});

// Create a slice for school
const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSchool.pending, (state) => {
        state.addSchoolsloading = true;
        state.addSchoolserror = null;
        state.status = null;
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.schoolData = action.payload;
        state.addSchoolsloading = false;
        state.status = 'success';
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.addSchoolsloading = false;
        state.addSchoolserror = action.error.message;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = schoolSlice.actions;
export default schoolSlice.reducer;
