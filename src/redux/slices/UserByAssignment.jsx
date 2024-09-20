// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
// import { schoolId } from '../../utils/reuseableId';
// Define the initial state for groups
const initialState = {
  assignmentuser: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchassignmentUser = createAsyncThunk(
  'assignmentuser/fetchassignmentUser',
  async (id) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`/group-assignment-users/${id}`);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch assignmentUser');
    }
  }
);

// Create a slice for groups
const assignmentuserSlice = createSlice({
  name: 'assignmentuser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchassignmentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchassignmentUser.fulfilled, (state, action) => {
        state.assignmentuser = action.payload;
        state.loading = false;
      })
      .addCase(fetchassignmentUser.rejected, (state, action) => {
        state.assignmentuser = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default assignmentuserSlice.reducer;
