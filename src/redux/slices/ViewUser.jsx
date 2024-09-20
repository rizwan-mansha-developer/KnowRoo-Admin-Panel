// src/redux/slices/viewUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewUser
const initialState = {
  viewUser: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchViewUser = createAsyncThunk('viewUser/fetchViewUser', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/user/${id}`);
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch viewUser');
  }
});

// Create a slice for viewUser
const viewUserSlice = createSlice({
  name: 'viewUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewUser.fulfilled, (state, action) => {
        state.viewUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchViewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewUserSlice.reducer;
