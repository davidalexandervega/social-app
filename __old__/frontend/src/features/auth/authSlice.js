import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// if user is in localStorage, parse the string into JSON and store it in user:
const user = JSON.parse(localStorage.getItem('user'));

// set the initial state:
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  // extraReducers watch for actions and update the state of the slice according
  // to the status of the action.
  // a 'payload' is the return value of an action (see above).
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// export the reducer of the slice:
export const { reset } = authSlice.actions;

// export the slice (which is a reducer of the global store):
export default authSlice.reducer;
