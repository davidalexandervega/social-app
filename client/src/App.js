import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Notifications from './views/Notifications';
import Feed from './views/Feed';
import Settings from './views/Settings';
import Login from './views/Login';
import Register from './views/Register';
import PostView from './views/PostView';

const App = () => {
  const { notifications } = useSelector((state) => state.notification);

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

  const feedRef = useRef();
  const pageBottomRef = useRef();

  return (
    <BrowserRouter>
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
          <Route path="/" element={<Feed feedRef={feedRef} pageBottomRef={pageBottomRef} />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Footer
              newPostData={newPostData}
              setNewPost={setNewPost}
              feedRef={feedRef}
              pageBottomRef={pageBottomRef}
            />
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
