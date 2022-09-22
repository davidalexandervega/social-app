import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from './notificationService';

const initialState = {
  notifications: [],
};

export const createNotification = createAsyncThunk(
  'notifications/create',
  async (notificationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.access;
      return await notificationService.createNotification(notificationData, token);
    } catch (error) {
      // check if any errors, and using the message as the payload if so:
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token.access;
    return await notificationService.fetchNotifications(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const checkNotifications = createAsyncThunk('notifications/check', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token.access;
    return await notificationService.checkNotifications(_, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notifications = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkNotifications.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(checkNotifications.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
