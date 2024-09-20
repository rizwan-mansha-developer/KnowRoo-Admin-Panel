// src/redux/postApiSlices/AddAdventureSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

export const addAdventure = createAsyncThunk(
  'adventure/add',
  async (adventureData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.post('/create-subject', adventureData);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addAdventureSlice = createSlice({
  name: 'addadventure',
  initialState: {
    advLoading: false,
    advError: null,
    status: null,
    adventureId: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
      state.advError = null;
      state.adventureId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdventure.pending, (state) => {
        state.advLoading = true;
        state.advError = null;
        state.status = null;
      })
      .addCase(addAdventure.fulfilled, (state, action) => {
        state.advLoading = false;
        state.status = 'success';
        state.adventureId = action.payload.id; // Assuming the response data contains the adventure ID as `id`
      })
      .addCase(addAdventure.rejected, (state, action) => {
        state.advLoading = false;
        state.advError = action.payload;
        state.status = 'error';
      });
  },
});

export const { resetStatus } = addAdventureSlice.actions;
export default addAdventureSlice.reducer;
