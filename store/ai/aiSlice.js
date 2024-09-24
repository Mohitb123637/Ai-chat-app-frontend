import { createSlice } from '@reduxjs/toolkit';
import { getChatHistory } from './aiAction';

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    response: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default aiSlice.reducer;
