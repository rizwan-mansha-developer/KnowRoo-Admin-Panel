// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  groups: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// const schoolId = Cookies.get('schoolId');
// console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchAdventure = createAsyncThunk('adventure/fetchAdventure', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    let response;

    response = await axiosInstance.get(`/view-subject-by-group/${id}`);

    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch Adventure');
  }
});

// Create a slice for groups
const adventureSlice = createSlice({
  name: 'adventure',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdventure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdventure.fulfilled, (state, action) => {
        state.adventure = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdventure.rejected, (state, action) => {
        state.adventure = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adventureSlice.reducer;
