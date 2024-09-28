import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axios';

export const registerUser = createAsyncThunk(
  'user/signup',
  async (
    { name, email, password, confirmPassword, number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosConfig.post('/user/signup', {
        name,
        email,
        password,
        confirmPassword,
        number,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/verifyEmail', {
        email,
        verificationCode,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/logout');
      localStorage.removeItem('token');
      return response.data.message;
    } catch (error) {
      console.error('Logout failed:', error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);
