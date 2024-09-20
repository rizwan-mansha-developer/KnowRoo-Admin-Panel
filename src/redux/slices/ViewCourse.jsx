// src/redux/slices/viewCourseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewCourse
const initialState = {
  viewCourse: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch viewCourse data from API
export const fetchviewCourse = createAsyncThunk('viewCourse/fetchviewCourse', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/view-material/${id}`);
    return response.data.material;
  } catch (error) {
    throw Error('Failed to fetch viewCourse');
  }
});
// Create a slice for viewCourse
const viewCourseSlice = createSlice({
  name: 'viewCourse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchviewCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchviewCourse.fulfilled, (state, action) => {
        state.viewCourse = action.payload;
        state.loading = false;
      })
      .addCase(fetchviewCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewCourseSlice.reducer;
