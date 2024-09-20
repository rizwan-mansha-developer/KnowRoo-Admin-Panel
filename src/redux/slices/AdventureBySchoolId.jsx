// src/redux/slices/groupsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
// Define the initial state for groups
const initialState = {
  adventureBySchool: [],
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
export const fetchAdventureBySchool = createAsyncThunk(
  'adventureBySchool/fetchAdventureBySchool',
  async (schoolId) => {
    try {
      const token = getToken();
      if (token) {
        setAuthToken(token);
      }
      const response = await axiosInstance.get(`view-all-subjects-against-school/${schoolId}`);
      return response.data.data;
    } catch (error) {
      throw Error(error.response.data.message || 'Failed to fetch Adventure');
    }
  }
);

// Create a slice for groups
const adventureBySchoolSlice = createSlice({
  name: 'adventureBySchool',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdventureBySchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdventureBySchool.fulfilled, (state, action) => {
        state.adventureBySchool = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdventureBySchool.rejected, (state, action) => {
        state.adventureBySchool = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adventureBySchoolSlice.reducer;
