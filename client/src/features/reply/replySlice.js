import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import replyService from './replyService';

const initialState = {
  replies: [],
  expandedPost: null,
  replyCreated: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const createReply = createAsyncThunk('replies/create', async (newReplyData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await replyService.createReply(newReplyData, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchReplies = createAsyncThunk('replies/fetch', async (postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await replyService.fetchReplies(postID, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const likeReply = createAsyncThunk('replies/like', async (replyData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;

    return await replyService.likeReply(replyData, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteReply = createAsyncThunk('replies/delete', async (replyID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await replyService.deleteReply(replyID, token);
  } catch (error) {
    const message = error.response.data;
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
    expandPost: (state, action) => {
      state.expandedPost = action.payload;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReply.fulfilled, (state, action) => {
        state.replyCreated = true;
        state.replies.push(action.payload);
        state.replies.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(createReply.rejected, (state, action) => {})
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.replies = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchReplies.rejected, (state, action) => {})
      .addCase(likeReply.fulfilled, (state, action) => {
        // to reflect the edited change so it immediately appears
        // in the UI without reloading:
        state.replies = state.replies.map((reply) =>
          reply.id === action.payload.id
            ? {
                ...reply,
                likes: action.payload.likes,
              }
            : reply
        );
      })
      .addCase(likeReply.rejected, (state, action) => {})
      .addCase(deleteReply.fulfilled, (state, action) => {})
      .addCase(deleteReply.rejected, (state, action) => {});
  },
});

export const { reset, expandPost, removeReply } = replySlice.actions;
export default replySlice.reducer;
