import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';

// Define the initial state for addQuestionnaire
const initialState = {
  questionnaireData: null,
  addQuestionnaireLoading: false,
  addQuestionnaireError: null,
  addQuestionnaireStatus: null,
};

// Function to get token from config
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addQuestionnaire = createAsyncThunk(
  'addQuestionnaire/addQuestionnaire',
  async (questionnaireData) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post(
        '/create-questionnaire-with-questions',
        questionnaireData
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.data.message ? error.data.message : 'Failed to add questionnaire';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create a slice for addQuestionnaire
const addQuestionnaireSlice = createSlice({
  name: 'addQuestionnaire',
  initialState,
  reducers: {
    resetaddQuestionnaireStatus: (state) => {
      state.addQuestionnaireStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestionnaire.pending, (state) => {
        state.addQuestionnaireLoading = true;
        state.addQuestionnaireError = null;
        state.addQuestionnaireStatus = 'loading';
      })
      .addCase(addQuestionnaire.fulfilled, (state, action) => {
        state.addQuestionnaireLoading = false;
        state.questionnaireData = action.payload;
        state.addQuestionnaireStatus = 'success';
      })
      .addCase(addQuestionnaire.rejected, (state, action) => {
        state.addQuestionnaireLoading = false;
        state.addQuestionnaireError = action.error.message;
        state.addQuestionnaireStatus = 'error';
      });
  },
});

// Export actions and reducer
export const { resetaddQuestionnaireStatus } = addQuestionnaireSlice.actions;
export default addQuestionnaireSlice.reducer;
