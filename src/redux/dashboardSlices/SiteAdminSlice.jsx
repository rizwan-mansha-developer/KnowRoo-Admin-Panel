// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  siteAdminDashbaord: {},
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// const schoolId = Cookies.get('schoolId');
// console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchSiteAdminDashbaord = createAsyncThunk(
  'siteAdminDashbaord/fetchSiteAdminDashbaord',
  async (date) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`site-admin-dashboard`);

      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch Dashbaord Data');
    }
  }
);

// Create a slice for groups
const siteAdminDashbaordSlice = createSlice({
  name: 'siteAdminDashbaord',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSiteAdminDashbaord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteAdminDashbaord.fulfilled, (state, action) => {
        state.siteAdminDashbaord = action.payload;
        state.loading = false;
      })
      .addCase(fetchSiteAdminDashbaord.rejected, (state, action) => {
        state.siteAdminDashbaord = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default siteAdminDashbaordSlice.reducer;
