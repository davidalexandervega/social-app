import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  message: '',
};

export const createPost = createAsyncThunk('posts/create', async (newPostData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.createPost(newPostData, token);
  } catch (error) {
    // check if any errors, and using the message as the payload if so:
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchPosts = createAsyncThunk('/posts/fetch', async (fetchCriteria, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.fetchPosts(fetchCriteria, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.deletePost(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // in this slice the entire state may be reset to the original,
    // whereas in authSlice.js the user must be persisted if authenticated:
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        // the deleted to-do item is filtered out so the UI
        // is immediately updated without reloading:
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
