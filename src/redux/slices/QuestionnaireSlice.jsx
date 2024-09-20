// src/redux/slices/questionnairesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

import Cookies from 'js-cookie';
// Define the initial state for questionnaires
const initialState = {
  questionnaires: [],
  questionnaireLoading: false,
  questionnaireError: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchQuestionnaire = createAsyncThunk(
  'questionnaires/fetchQuestionnaire',
  async (id) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`questionnaire/module/${id}`);
      return response.data.data;
    } catch (error) {
      throw Error('Failed to fetch questionnaires');
    }
  }
);

// Create a slice for questionnaires
const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionnaire.pending, (state) => {
        state.questionnaireLoading = true;
        state.questionnaireError = null;
      })
      .addCase(fetchQuestionnaire.fulfilled, (state, action) => {
        state.questionnaires = action.payload;
        state.questionnaireLoading = false;
      })
      .addCase(fetchQuestionnaire.rejected, (state, action) => {
        state.questionnaires = { ...initialState, notFound: true };
        state.questionnaireLoading = false;
        state.questionnaireError = action.error.message;
      });
  },
});

export default questionnairesSlice.reducer;
