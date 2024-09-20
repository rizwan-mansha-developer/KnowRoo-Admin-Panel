import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

// Define the initial state for mobs
const initialState = {
  mobData: null,
  mobLoading: false,
  mobError: null,
  status: null,
  mobId: null, // State to store mobId
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to post data to API
export const addMobs = createAsyncThunk('mob/addMobs', async (mobData) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    const response = await axiosInstance.post('/create-groups', mobData);
    console.log(response);

    return response.data.data; // Return the full response data
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to add mob');
  }
});

// Create a slice for mob
const addmobSlice = createSlice({
  name: 'mob',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMobs.pending, (state) => {
        state.mobLoading = true;
        state.mobError = null;
        state.status = null;
      })
      .addCase(addMobs.fulfilled, (state, action) => {
        state.mobData = action.payload;
        state.mobLoading = false;
        state.status = 'success';
        state.mobId = action.payload.id; // Store mobId from response
      })
      .addCase(addMobs.rejected, (state, action) => {
        state.mobLoading = false;
        state.mobError = action.error.message;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = addmobSlice.actions;
export default addmobSlice.reducer;
