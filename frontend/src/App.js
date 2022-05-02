import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './assets/styles/global.scss';
import X from './views/X';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<X />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
