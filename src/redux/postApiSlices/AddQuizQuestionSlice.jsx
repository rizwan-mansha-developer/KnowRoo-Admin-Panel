import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

// Define the initial state for addquestion
const initialState = {
  questionData: null,
  questionLoading: false,
  questionError: null,
  status: null,
};

// Function to get token from config
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addquestion = createAsyncThunk('addquestion/addquestion', async (questionData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-quiz-question', questionData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add question');
  }
});

// Create a slice for addquestion
const addquestionSlice = createSlice({
  name: 'addQuestion',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addquestion.pending, (state) => {
        state.questionLoading = true;
        state.questionError = null;
        state.status = 'loading';
      })
      .addCase(addquestion.fulfilled, (state, action) => {
        state.questionLoading = false;
        state.questionData = action.payload;
        state.status = 'success';
      })
      .addCase(addquestion.rejected, (state, action) => {
        state.questionLoading = false;
        state.questionError = action.error.message;
        state.status = 'error';
      });
  },
});

// Export actions and reducer
export const { resetStatus } = addquestionSlice.actions;
export default addquestionSlice.reducer;
