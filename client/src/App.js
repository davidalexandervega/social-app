import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Feed from './views/Feed';
import Login from './views/Login';

const App = () => {
  const [newPostData, setNewPost] = useState({
    newPostBody: '',
  });

  return (
    <BrowserRouter>
      <Header />
      <div id="page">
        <Sidebar newPostData={newPostData} setNewPost={setNewPost} />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Footer newPostData={newPostData} setNewPost={setNewPost} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
