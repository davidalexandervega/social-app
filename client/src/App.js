import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import UpdateBar from './components/UpdateBar';
import Footer from './components/Footer';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Notifications from './views/Notifications';
import Feed from './views/Feed';
import Settings from './views/Settings';
import Login from './views/Login';
import Register from './views/Register';
import PostView from './views/PostView';

import jwt from 'jwt-decode';

import { fetchUser } from './features/auth/authSlice';

const App = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  // fetch the user from the token claim info if present:
  useEffect(() => {
    if (token) {
      console.log('token:', jwt(token));
      dispatch(fetchUser(jwt(token).id));
    }
  }, [dispatch, token]);

  // set the notification bell's style every time new notifications are fetched
  // throughout the application:
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    if (notifications.filter((notification) => notification.seen === false).length > 0) {
      setNotify(true);
    } else {
      setNotify(false);
    }
  }, [notifications]);

  // create the new post object here, which is passed into the sidebar and footer,
  // allowing them to share data as the view size changes:
  const [newPostData, setNewPost] = useState({
    newPostBody: '',
    newPostImg: null,
    disableFile: false,
  });

  return (
    <BrowserRouter>
      <Header notify={notify} />
      <div id="page">
        <Sidebar newPostData={newPostData} setNewPost={setNewPost} notify={notify} />
        {user ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users/:profileUsername" element={<Profile />} />
            <Route path="/users/:profileUsername/edit" element={<EditProfile />} />
            <Route
              path="/notifications"
              element={<Notifications notify={notify} setNotify={setNotify} />}
            />
            <Route path="/" element={<Feed />} />
            <Route path="/posts/:postID" element={<PostView />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="*"
              exact={true}
              element={<div className="view">404: page not found.</div>}
            />
          </Routes>
        ) : null}
        {!token ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" exact={true} element={<Navigate to="/login" />} />
          </Routes>
        ) : null}
        <UpdateBar />
      </div>
      <Routes>
        <Route path="/" element={<Footer newPostData={newPostData} setNewPost={setNewPost} />} />
        <Route
          path="/users/:profileUsername"
          element={<Footer newPostData={newPostData} setNewPost={setNewPost} />}
        />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
