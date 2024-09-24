import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axios';

export const getUser = createAsyncThunk(
  'user/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);
