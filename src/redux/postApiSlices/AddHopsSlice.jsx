import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

// Define the initial state for hops
const initialState = {
  hopsId: null,
  hopsLoading: false,
  hopsError: null,
  status: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addHops = createAsyncThunk('hops/addHops', async (hopsData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-module', hopsData);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add Hops');
  }
});

// Create a slice for hops
const addHopsSlice = createSlice({
  name: 'addHops',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHops.pending, (state) => {
        state.hopsLoading = true;
        state.hopsError = null;
        state.status = null;
      })
      .addCase(addHops.fulfilled, (state, action) => {
        state.hopsLoading = false;
        state.hopsId = action.payload.id; // Ensure this matches the actual structure of your response
        state.status = 'success';
      })
      .addCase(addHops.rejected, (state, action) => {
        state.hopsLoading = false;
        state.hopsError = action.error.message;
        state.status = 'error';
      });
  },
});

// Export actions and reducer
export const { resetStatus } = addHopsSlice.actions;
export default addHopsSlice.reducer;
