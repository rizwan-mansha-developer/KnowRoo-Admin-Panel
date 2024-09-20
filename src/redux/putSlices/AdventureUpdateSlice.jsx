import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Thunk to update an existing adventure
export const updateAdventure = createAsyncThunk(
  'adventure/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.put(`/update-subject/${id}`, updatedData);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateAdventureSlice = createSlice({
  name: 'updateadventure',
  initialState: {
    advLoading: false,
    advError: null,
    status: null,
    adventureId: null,
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.status = null;
      state.advError = null;
      state.adventureId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAdventure.pending, (state) => {
        state.advLoading = true;
        state.advError = null;
        state.status = null;
      })
      .addCase(updateAdventure.fulfilled, (state, action) => {
        state.advLoading = false;
        state.status = 'update_success';
        state.adventureId = action.payload.id; // Assuming the response data contains the updated adventure ID as `id`
      })
      .addCase(updateAdventure.rejected, (state, action) => {
        state.advLoading = false;
        state.advError = action.payload;
        state.status = 'update_error';
      });
  },
});

export const { resetUpdateStatus } = updateAdventureSlice.actions;
export default updateAdventureSlice.reducer;
