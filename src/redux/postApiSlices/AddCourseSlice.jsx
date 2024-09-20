import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for addCourse
const initialState = {
  courseData: null,
  addCourseLoading: false,
  addCourseError: null,
  addCourseStatus: null,
};

// Function to get token from config
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addCourse = createAsyncThunk('addCourse/addCourse', async (courseData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-material', courseData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add questionnaire');
  }
});

// Create a slice for addCourse
const addCourseSlice = createSlice({
  name: 'addCourse',
  initialState,
  reducers: {
    resetaddCourseStatus: (state) => {
      state.addCourseStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.addCourseLoading = true;
        state.addCourseError = null;
        state.addCourseStatus = 'loading';
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.addCourseLoading = false;
        state.courseData = action.payload;
        state.addCourseStatus = 'success';
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.addCourseLoading = false;
        state.addCourseError = action.error.message;
        state.addCourseStatus = 'error';
      });
  },
});

// Export actions and reducer
export const { resetaddCourseStatus } = addCourseSlice.actions;
export default addCourseSlice.reducer;
