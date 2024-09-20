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

const schoolId = Cookies.get('schoolId');
console.log(schoolId);

// Define the async thunk to fetch data from API
export const fetchGroups = createAsyncThunk('groups/fetchGroups', async (id = null) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }
    let response;
    if (id) {
      // Fetch a specific group by ID
      response = await axiosInstance.get(`/groups-against-school/${id}`);
    } else {
      // Fetch all groups
      response = await axiosInstance.get(`/groups-against-school/${schoolId}`);
    }
    return response.data.groups;
  } catch (error) {
    throw Error('Failed to fetch groups');
  }
});

// Create a slice for groups
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.groups = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default groupsSlice.reducer;
