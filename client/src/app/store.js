import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';
import replyReducer from '../features/reply/replySlice';
import notificationReducer from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    reply: replyReducer,
    notification: notificationReducer,
  },
});

export default store;
