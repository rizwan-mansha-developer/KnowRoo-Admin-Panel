import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

// Define the initial state for leaps
const initialState = {
  leapsId: null,
  leapsLoading: false,
  leapsError: null,
  addStatus: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addLeaps = createAsyncThunk('leaps/addLeaps', async (leapsData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-class', leapsData);
    console.log(response);
    return response.data.data; // Ensure this matches the actual structure of your response
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add leaps');
  }
});

// Create a slice for leaps
const leapsSlice = createSlice({
  name: 'addleaps',
  initialState,
  reducers: {
    resetaddStatus: (state) => {
      state.addStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLeaps.pending, (state) => {
        state.leapsLoading = true;
        state.leapsError = null;
        state.addStatus = null;
      })
      .addCase(addLeaps.fulfilled, (state, action) => {
        state.leapsLoading = false;
        state.leapsId = action.payload.id; // Ensure this matches the actual structure of your response
        state.addStatus = 'success';
      })
      .addCase(addLeaps.rejected, (state, action) => {
        state.leapsLoading = false;
        state.leapsError = action.error.message;
        state.addStatus = 'error';
      });
  },
});

// Export actions and reducer
export const { resetaddStatus } = leapsSlice.actions;
export default leapsSlice.reducer;
