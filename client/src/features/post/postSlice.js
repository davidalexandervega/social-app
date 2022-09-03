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

export const fetchAllPosts = createAsyncThunk('posts/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.fetchAllPosts(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch/username',
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await postService.fetchUserPosts(username, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPostById = createAsyncThunk('posts/fetch/id', async (postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.fetchPostById(postID, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const likePost = createAsyncThunk('posts/like', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;

    return await postService.likePost(postData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await postService.deletePost(postID, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // here a post is actually removed from the global store before it's deleted,
    // enabling a more responsive user experience:
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    // in this slice the entire state may be reset to the original,
    // whereas in authSlice.js the user must be persisted if authenticated:
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts.push(action.payload);
        state.posts.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = [action.payload];
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        // to reflect the edited change so it immediately appears
        // in the UI without reloading:
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                likes: action.payload.likes,
              }
            : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        // the deleted post is filtered out so the UI
        // is immediately updated without reloading:
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, removePost } = postSlice.actions;
export default postSlice.reducer;
