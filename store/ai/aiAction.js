import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axios';

export const getResponse = createAsyncThunk(
  '/ai',
  async ({ question }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/ai', { question });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getChatHistory = createAsyncThunk(
  '/ai/chat-history',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.get('/ai/chat-history');
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteChat = createAsyncThunk(
  '/ai/delete-chat',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.delete('/ai/delete-chat');
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
