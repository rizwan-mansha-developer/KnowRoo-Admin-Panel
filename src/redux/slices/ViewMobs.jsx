// src/redux/slices/viewMobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewMobs
const initialState = {
  viewMobs: '',
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchViewMobs = createAsyncThunk('viewMobs/fetchViewMobs', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/group/${id}`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch viewMobs');
  }
});

// Create a slice for viewMobs
const viewMobsSlice = createSlice({
  name: 'viewMobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewMobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewMobs.fulfilled, (state, action) => {
        state.viewMobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchViewMobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewMobsSlice.reducer;
