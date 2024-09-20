import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for questionnaireQuestion
const initialState = {
  questionnaireQuestion: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch questionnaireQuestion data from API
export const fetchquestionnaireQuestion = createAsyncThunk(
  'questionnaireQuestion/fetchquestionnaireQuestion',
  async (id) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`/questionnaire/${id}`);
      console.log(response.data.data.questions);
      return response.data.data;
    } catch (error) {
      throw Error('Failed to fetch questionnaireQuestion');
    }
  }
);

// Create a slice for questionnaireQuestion
const questionnaireQuestionSlice = createSlice({
  name: 'questionnaireQuestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchquestionnaireQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchquestionnaireQuestion.fulfilled, (state, action) => {
        state.questionnaireQuestion = action.payload;
        state.loading = false;
      })
      .addCase(fetchquestionnaireQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default questionnaireQuestionSlice.reducer;
