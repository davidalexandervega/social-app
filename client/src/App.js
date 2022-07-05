import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './assets/styles/global.scss';
import Feed from './views/Feed';
import Login from './views/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
