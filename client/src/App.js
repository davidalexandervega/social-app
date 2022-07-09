import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './assets/styles/global.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './views/Feed';
import Login from './views/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div id="page">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
