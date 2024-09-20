// src/redux/slices/quizsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for quizs
const initialState = {
  quizs: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchQuiz = createAsyncThunk('quizs/fetchQuiz', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`quiz/module/${id}`);
    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch quizs');
  }
});

// Create a slice for quizs
const quizsSlice = createSlice({
  name: 'quizs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quizs = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.quizs = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizsSlice.reducer;
