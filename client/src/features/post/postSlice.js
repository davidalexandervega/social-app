import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  postEnabled: true,
  isError: false,
  isSuccess: false,
  message: '',
};

export const createPost = createAsyncThunk('posts/create', async (newPostData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await postService.createPost(newPostData, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAllPosts = createAsyncThunk('posts/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await postService.fetchAllPosts(token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch/username',
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await postService.fetchUserPosts(username, token);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPostByID = createAsyncThunk('posts/fetch/id', async (postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await postService.fetchPostByID(postID, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const likePost = createAsyncThunk('posts/like', async (postData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await postService.likePost(postData, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePost = createAsyncThunk('posts/delete', async (postID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await postService.deletePost(postID, token);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    enablePost: (state) => {
      state.postEnabled = true;
    },
    disablePost: (state) => {
      state.postEnabled = false;
    },
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
        state.posts.push(action.payload);
        state.posts.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(createPost.rejected, (state, action) => {})
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {})
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = action.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {})
      .addCase(fetchPostByID.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = [action.payload];
      })
      .addCase(fetchPostByID.rejected, (state, action) => {})
      .addCase(likePost.fulfilled, (state, action) => {
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
      .addCase(likePost.rejected, (state, action) => {})
      .addCase(deletePost.fulfilled, (state, action) => {
        // the deleted post is filtered out so the UI
        // is immediately updated without reloading:
        state.posts = state.posts.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {});
  },
});

export const { reset, enablePost, disablePost, removePost } = postSlice.actions;
export default postSlice.reducer;
