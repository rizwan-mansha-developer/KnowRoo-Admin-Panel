// src/redux/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for courses
const initialState = {
  courses: [],
  courseLoading: false,
  courseError: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchCourse = createAsyncThunk('courses/fetchCourse', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`view-all-materials-in-module/${id}`);
    return response.data.materials;
  } catch (error) {
    throw Error('Failed to fetch courses');
  }
});

// Create a slice for courses
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.courseLoading = true;
        state.courseError = null;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.courseLoading = false;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.courses = { ...initialState, notFound: true };
        state.courseLoading = false;
        state.courseError = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
