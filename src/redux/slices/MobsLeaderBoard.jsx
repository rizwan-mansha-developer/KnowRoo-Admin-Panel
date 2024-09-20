// src/redux/slices/mobsLeaderBoardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for mobsLeaderBoard
const initialState = {
  mobsLeaderBoard: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

// Define the async thunk to fetch data from API
export const fetchMobsLeaderBoard = createAsyncThunk(
  'mobsLeaderBoard/fetchMobsLeaderBoard',
  async (id) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }

      const response = await axiosInstance.get(`/leaderboard?${id}`);

      return response.data.leaderboard;
    } catch (error) {
      throw Error('Failed to fetch mobsLeaderBoard');
    }
  }
);

// Create a slice for mobsLeaderBoard
const mobsLeaderBoardSlice = createSlice({
  name: 'mobsLeaderBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobsLeaderBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobsLeaderBoard.fulfilled, (state, action) => {
        state.mobsLeaderBoard = action.payload;
        state.loading = false;
      })
      .addCase(fetchMobsLeaderBoard.rejected, (state, action) => {
        state.mobsLeaderBoard = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mobsLeaderBoardSlice.reducer;
