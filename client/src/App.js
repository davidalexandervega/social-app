import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Notifications from './views/Notifications';
import Feed from './views/Feed';
import Login from './views/Login';
import PostView from './views/PostView';

const App = () => {
  const [newPostData, setNewPost] = useState({
    newPostBody: '',
    newPostImg: null,
  });

  return (
    <BrowserRouter>
      <Header />
      <div id="page">
        <Sidebar newPostData={newPostData} setNewPost={setNewPost} />
        <Routes>
          <Route path="/notifications" element={<Notifications />} />
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
