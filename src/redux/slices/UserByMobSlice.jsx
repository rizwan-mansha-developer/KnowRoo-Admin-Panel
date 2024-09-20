// src/redux/slices/userByMobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
// Define the initial state for userByMob
const initialState = {
  userByMob: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchuserByMob = createAsyncThunk('userByMob/fetchuserByMob', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/view-group-users/${id}`);

    return response.data.users;
  } catch (error) {
    throw Error('Failed to fetch userByMob');
  }
});

// Create a slice for userByMob
const userByMobSlice = createSlice({
  name: 'userByMob',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserByMob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchuserByMob.fulfilled, (state, action) => {
        state.userByMob = action.payload;
        state.loading = false;
      })
      .addCase(fetchuserByMob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userByMobSlice.reducer;
