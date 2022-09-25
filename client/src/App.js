import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (notifications.filter((notification) => notification.seen === false).length > 0) {
      setNotify(true);
    } else {
      setNotify(false);
    }
  }, [notifications]);

  const [newPostData, setNewPost] = useState({
    newPostBody: '',
    newPostImg: null,
    disableFile: false,
  });

  useEffect(() => {
    if (token) {
      // this is causing there to be an error message on the login page upon logout.
      // the reason is because the username is still present in the global state upon logout.
      dispatch(fetchUser(jwt(token.access).user_id));
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Header notify={notify} />
          <div id="page">
            <Sidebar newPostData={newPostData} setNewPost={setNewPost} notify={notify} />
            <Routes>
              <Route path="/users/:profileUsername" element={<Profile />} />
              <Route path="/users/:profileUsername/edit" element={<EditProfile />} />
              <Route
                path="/notifications"
                element={<Notifications notify={notify} setNotify={setNotify} />}
              />
              <Route path="/" element={<Feed />} />
              <Route path="/posts/:id" element={<PostView />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                exact={true}
                element={<div className="view">404: page not found.</div>}
              />
            </Routes>
            <UpdateBar />
          </div>
          <Routes>
            <Route
              path="/"
              element={<Footer newPostData={newPostData} setNewPost={setNewPost} />}
            />
            <Route
              path="/users/:profileUsername"
              element={<Footer newPostData={newPostData} setNewPost={setNewPost} />}
            />
            <Route path="*" element={<></>} />
          </Routes>
        </>
      ) : null}
    </BrowserRouter>
  );
};

export default App;
