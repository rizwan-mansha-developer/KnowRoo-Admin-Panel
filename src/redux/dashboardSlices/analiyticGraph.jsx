// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  analiyticDashbaord: {},
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
export const fetchanaliyticDashbaord = createAsyncThunk(
  'analiyticDashbaord/fetchanaliyticDashbaord',
  async (param) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`analytics?${param}`);

      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch Dashbaord');
    }
  }
);

// Create a slice for groups
const analiyticDashbaordSlice = createSlice({
  name: 'analiyticDashbaord',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchanaliyticDashbaord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchanaliyticDashbaord.fulfilled, (state, action) => {
        state.analiyticDashbaord = action.payload;
        state.loading = false;
      })
      .addCase(fetchanaliyticDashbaord.rejected, (state, action) => {
        state.analiyticDashbaord = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default analiyticDashbaordSlice.reducer;
