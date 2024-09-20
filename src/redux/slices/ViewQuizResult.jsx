// src/redux/slices/quizResultSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for quizResult
const initialState = {
  quizResult: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch quizResult data from API
export const fetchquizResult = createAsyncThunk(
  'quizResult/fetchquizResult',
  async (id, userId) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`/view-quiz-result-user/${id}/${userId}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw Error('Failed to fetch quizResult');
    }
  }
);
// Create a slice for quizResult
const quizResultSlice = createSlice({
  name: 'quizResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchquizResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchquizResult.fulfilled, (state, action) => {
        state.quizResult = action.payload;
        state.loading = false;
      })
      .addCase(fetchquizResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizResultSlice.reducer;
