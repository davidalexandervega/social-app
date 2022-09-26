import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// if token is in localStorage, parse the string into JSON and store it in token:
const token = JSON.parse(localStorage.getItem('token'));

// set the initial state:
const initialState = {
  token: token ? token : null,
  user: null,
  profileUser: null,
  updating: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// this is an action which can be dispatched in any component via useDispatch.
// useSelector may be used in any component to access any slice of the state.
// createAsyncThunk is a handler for async operations in redux.
// thunkAPI assists with the response.
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    // check if any errors, and using the message as the payload if so:
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const fetchUser = createAsyncThunk('auth/user/fetch-user', async (userID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token.access;
    return await authService.fetchUser(userID, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchProfile = createAsyncThunk(
  'auth/user/fetch-profile',
  async (username, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.access;
      return await authService.fetchProfile(username, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editProfile = createAsyncThunk(
  'auth/user/edit-profile',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.access;
      return await authService.editProfile(profileData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk('auth/user/edit-user', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token.access;
    return await authService.editUser(userData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token.access;
      return await authService.changePassword(passwordData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followUser = createAsyncThunk('auth/user/follow', async (followData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token.access;
    return await authService.followUser(followData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.updating = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    toggleUpdate: (state) => {
      state.updating === false ? (state.updating = true) : (state.updating = false);
    },
    removeUserPicture: (state) => {
      state.user.hasPicture = false;
    },
    ejectProfile: (state) => {
      state.profileUser = null;
    },
    updateFollowing: (state) => {
      if (state.profileUser.followers.includes(state.user.id)) {
        state.profileUser.followers.splice(state.profileUser.followers.indexOf(state.user.id), 1);
        state.user.following.splice(state.user.following.indexOf(state.profileUser.id), 1);
      } else {
        state.profileUser.followers.push(state.user.id);
        state.user.following.push(state.profileUser.id);
      }
    },
  },

  // extraReducers watch for actions and update the state of the slice according
  // to the status of the action.
  // a 'payload' is the return value of an action (see above).
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.profileUser = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.updating = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.updating = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// export the reducer of the slice:
export const { reset, toggleUpdate, removeUserPicture, ejectProfile, updateFollowing } =
  authSlice.actions;

// export the slice (which is a reducer of the global store):
export default authSlice.reducer;
