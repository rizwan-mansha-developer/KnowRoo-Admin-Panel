import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken } from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

const initialState = {
  hopsData: [],
  loading: false,
  error: null,
};

const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

export const fetchHops = createAsyncThunk('hops/fetchHops', async (id) => {
  try {
    const token = getToken();
    if (token) {
      setAuthToken(token);
    }

    let response;

    if (id) {
      response = await axiosInstance.get(`/view-all-modules-in-class/${id}`);
    } else {
      response = await axiosInstance.get('/view-all-modules');
    }
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch hops');
  }
});

const hopsSlice = createSlice({
  name: 'hops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHops.fulfilled, (state, action) => {
        state.hopsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchHops.rejected, (state, action) => {
        state.hopsData = { ...initialState, notFound: true };
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default hopsSlice.reducer;
