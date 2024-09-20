// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
// import { schoolId } from '../../utils/reuseableId';
// Define the initial state for groups
const initialState = {
  quizUser: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchquizUser = createAsyncThunk('quizUser/fetchquizUser', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/group-quiz-users/${id}`);
    return response.data.users;
  } catch (error) {
    throw Error('Failed to fetch quizUser');
  }
});

// Create a slice for groups
const quizUserSlice = createSlice({
  name: 'quizUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchquizUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchquizUser.fulfilled, (state, action) => {
        state.quizUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchquizUser.rejected, (state, action) => {
        state.quizUser = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizUserSlice.reducer;
