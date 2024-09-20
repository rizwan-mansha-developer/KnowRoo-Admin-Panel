import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for addquiz
const initialState = {
  quizData: null,
  quizLoading: false,
  quizError: null,
  status: null,
};

// Function to get token from config
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addquiz = createAsyncThunk('addquiz/addquiz', async (quizData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-quiz-with-questions', quizData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add quiz');
  }
});

// Create a slice for addquiz
const addquizSlice = createSlice({
  name: 'addquiz',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addquiz.pending, (state) => {
        state.quizLoading = true;
        state.quizError = null;
        state.status = 'loading';
      })
      .addCase(addquiz.fulfilled, (state, action) => {
        state.quizLoading = false;
        state.quizData = action.payload;
        state.status = 'success';
      })
      .addCase(addquiz.rejected, (state, action) => {
        state.quizLoading = false;
        state.quizError = action.error.message;
        state.status = 'error';
      });
  },
});

// Export actions and reducer
export const { resetStatus } = addquizSlice.actions;
export default addquizSlice.reducer;
