// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  leaps: [],
  loading: false,
  error: null,
};

// Function to get token from localStorage or session storage
const getToken = () => {
  const token = Cookies.get('token');
  return token;
};
const schoolId = Cookies.get('schoolId');
console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchLeaps = createAsyncThunk('leaps/fetchLeaps', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    let response;
    if (id) {
      response = await axiosInstance.get(`/view-class-by-subject/${id}`);
    } else if (schoolId) {
      response = await axiosInstance.get(`view-all-classes-against-school/${schoolId}`);
    }
    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message || 'Failed to fetch Leaps');
  }
});
// Create a slice for groups
const leapsSlice = createSlice({
  name: 'leaps',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaps.fulfilled, (state, action) => {
        state.leaps = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeaps.rejected, (state, action) => {
        state.leaps = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default leapsSlice.reducer;
