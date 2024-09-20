// src/redux/slices/viewSchoolSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewSchool
const initialState = {
  viewSchool: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchViewSchool = createAsyncThunk('viewSchool/fetchViewSchool', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/school/${id}`);
    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch viewSchool');
  }
});

// Create a slice for viewSchool
const viewSchoolSlice = createSlice({
  name: 'viewSchool',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewSchool.fulfilled, (state, action) => {
        state.viewSchool = action.payload;
        state.loading = false;
      })
      .addCase(fetchViewSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewSchoolSlice.reducer;
