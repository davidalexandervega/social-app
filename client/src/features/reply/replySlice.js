import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import replyService from './replyService';

const initialState = {
  replies: [],
  isError: false,
  isSuccess: false,
  message: '',
};

export const createReply = createAsyncThunk('replies/create', async (newReplyData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await replyService.createReply(newReplyData, token);
  } catch (error) {
    // check if any errors, and using the message as the payload if so:
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchReplies = createAsyncThunk('/replies/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await replyService.fetchReplies(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const likeReply = createAsyncThunk('/replies/like', async (replyData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;

    return await replyService.likeReply(replyData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteReply = createAsyncThunk('replies/delete', async (replyID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await replyService.deleteReply(replyID, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const replySlice = createSlice({
  name: 'replies',
  initialState,
  reducers: {
    // here a reply is actually removed from the global store before it's deleted,
    // enabling a more responsive user experience:
    removeReply: (state, action) => {
      state.replies = state.replies.filter((reply) => reply.id !== action.payload);
    },
    // in this slice the entire state may be reset to the original,
    // whereas in authSlice.js the user must be persisted if authenticated:
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReply.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.replies.push(action.payload);
        state.replies.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.replies = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeReply.fulfilled, (state, action) => {
        state.isSuccess = true;
        // to reflect the edited change so it immediately appears
        // in the UI without reloading:
        state.replies = state.replies.map((reply) =>
          reply.id === action.payload.id
            ? {
                ...reply,
                likes: action.payload.likes,
              }
            : reply,
        );
      })
      .addCase(likeReply.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.isSuccess = true;
        // the deleted reply is filtered out so the UI
        // is immediately updated without reloading:
        state.replies = state.replies.filter((reply) => reply.id !== action.payload.id);
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, removeReply } = replySlice.actions;
export default replySlice.reducer;
