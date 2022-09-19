import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import jwt from 'jwt-decode';

// if user is in localStorage, parse the string into JSON and store it in user:
const user = JSON.parse(localStorage.getItem('user'));

// set the initial state:
const initialState = {
  user: user ? user : null,
  userID: user ? jwt(user.access).user_id : null,
  username: user ? jwt(user.access).username : null,
  userEmail: user ? jwt(user.access).email : null,
  userPicture: user ? jwt(user.access).userPicture : false,
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

export const fetchUser = createAsyncThunk('auth/fetch/username', async (username, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await authService.fetchUser(username, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editProfile = createAsyncThunk('auth/editProfile', async (profileData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
    return await authService.editProfile(profileData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editUser = createAsyncThunk('auth/editUser', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.access;
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
      const token = thunkAPI.getState().auth.user.access;
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
        state.user = action.payload;
        state.userID = jwt(state.user.access).user_id;
        state.username = jwt(state.user.access).username;
        state.userEmail = jwt(state.user.access).email;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.profileUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.profileUser.bio = action.payload.bio;
        state.userPicture = action.payload.picture;
        state.profileUser.userPicture = action.payload.picture;
        state.updating = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.username = action.payload.username;
        state.userEmail = action.payload.userEmail;
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
      });
  },
});

// export the reducer of the slice:
export const { reset, toggleUpdate } = authSlice.actions;

// export the slice (which is a reducer of the global store):
export default authSlice.reducer;
