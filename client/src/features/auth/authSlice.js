import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// if token is in localStorage, parse the string into JSON and store it in token:
const token = JSON.parse(localStorage.getItem('social-infinity'));

// set the initial state:
const initialState = {
  token: token ? token : null,
  user: null,
  profileUser: null,
  relog: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// this is an action which can be dispatched in any component via useDispatch.
// actions modify the state of the corresponding slice of the global store they're in.
// useSelector may be used in any component to access any slice of the store.
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
    const token = thunkAPI.getState().auth.token;
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
      const token = thunkAPI.getState().auth.token;
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
      const token = thunkAPI.getState().auth.token;
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
    const token = thunkAPI.getState().auth.token;
    return await authService.editUser(userData, token);
  } catch (error) {
    console.log('client error handling triggered');
    console.log(error.toString());
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
      const token = thunkAPI.getState().auth.token;
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
    const token = thunkAPI.getState().auth.token;
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
  // reducers are functions that may be dispatched anywhere they're imported
  // which can modify their parent slice of the global store:
  reducers: {
    reset: (state) => {
      state.relog = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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

  // extraReducers watch actions and may update the state of the slice
  // according to changes in the status of the action, which are determined
  // by the type of value they return (i.e. a json response versus an error).
  // a 'payload' is the return value of an action (see above).
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {})
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {})
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileUser = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {})
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.relog = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {})
      .addCase(followUser.rejected, (state, action) => {});
  },
});

// export the reducers of the slice:
export const { reset, setLoading, ejectProfile, updateFollowing } = authSlice.actions;

// export the slice (which is a reducer of the global store):
export default authSlice.reducer;
