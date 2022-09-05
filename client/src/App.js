import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Profile from './views/Profile';
import Notifications from './views/Notifications';
import Feed from './views/Feed';
import Login from './views/Login';
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

  return (
    <BrowserRouter>
      <Header notify={notify} />
      <div id="page">
        <Sidebar newPostData={newPostData} setNewPost={setNewPost} notify={notify} />
        <Routes>
          <Route path="/users/:profileUsername" element={<Profile />} />
          <Route
            path="/notifications"
            element={<Notifications notify={notify} setNotify={setNotify} />}
          />
          <Route path="/" element={<Feed />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Footer newPostData={newPostData} setNewPost={setNewPost} />} />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
