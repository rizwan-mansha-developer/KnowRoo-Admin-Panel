// src/redux/slices/viewQuizSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for viewQuiz
const initialState = {
  viewQuiz: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch viewQuiz data from API
export const fetchviewQuiz = createAsyncThunk('viewQuiz/fetchviewQuiz', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.get(`/quiz/${id}`);
    // console.log(response.data.data.questions);
    return response.data.data;
  } catch (error) {
    throw Error('Failed to fetch viewQuiz');
  }
});
// Create a slice for viewQuiz
const viewQuizSlice = createSlice({
  name: 'viewQuiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchviewQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchviewQuiz.fulfilled, (state, action) => {
        state.viewQuiz = action.payload;
        state.loading = false;
      })
      .addCase(fetchviewQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viewQuizSlice.reducer;
