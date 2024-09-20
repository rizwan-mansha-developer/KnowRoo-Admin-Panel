// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
// import { schoolId } from '../../utils/reuseableId';
// Define the initial state for groups
const initialState = {
  user: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/view-all-users/${id}`);
    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch User');
  }
});

// Create a slice for groups
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
