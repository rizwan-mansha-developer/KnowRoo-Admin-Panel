// src/redux/slices/assignmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for assignments
const initialState = {
  assignments: [],
  assignmentLoading: false,
  assignmentError: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchAssignment = createAsyncThunk('assignments/fetchAssignment', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`assignment/module/${id}`);
    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch assignments');
  }
});

// Create a slice for assignments
const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignment.pending, (state) => {
        state.assignmentLoading = true;
        state.assignmentError = null;
      })
      .addCase(fetchAssignment.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.assignmentLoading = false;
      })
      .addCase(fetchAssignment.rejected, (state, action) => {
        state.assignments = { ...initialState, notFound: true };
        state.assignmentLoading = false;
        state.assignmentError = action.error.message;
      });
  },
});

export default assignmentsSlice.reducer;
