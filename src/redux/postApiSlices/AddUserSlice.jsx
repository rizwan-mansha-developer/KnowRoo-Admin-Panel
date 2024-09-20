// src/redux/slices/addUserSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance'; // Adjust import based on your actual path
import Cookies from 'js-cookie'; // Adjust import based on your actual path

// Define the initial state for users
const initialState = {
  userData: null,
  userLoading: false,
  userError: null,
  status: null, // To handle success or error messages
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addUser = createAsyncThunk('user/addUser', async (formData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/register', formData);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add user');
  }
});

// Create a slice for user
const addUserSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.status = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.userLoading = false;
        state.status = 'success';
      })
      .addCase(addUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = addUserSlice.actions;
export default addUserSlice.reducer;
