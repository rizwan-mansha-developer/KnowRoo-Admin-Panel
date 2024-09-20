// src/redux/slices/viewLeapsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewLeaps
const initialState = {
  viewLeaps: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchViewLeaps = createAsyncThunk('viewLeaps/fetchViewLeaps', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/Leaps/${id}`);
    return response.data.data.data;
  } catch (error) {
    throw Error('Failed to fetch viewLeaps');
  }
});

// Create a slice for viewLeaps
const viewLeapsSlice = createSlice({
  name: 'viewLeaps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewLeaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewLeaps.fulfilled, (state, action) => {
        state.viewLeaps = action.payload;
        state.loading = false;
      })
      .addCase(fetchViewLeaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewLeapsSlice.reducer;
