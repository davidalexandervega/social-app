import React, { useEffect } from 'react';
import axios from 'axios';

const X = () => {
  // example fetch request from the example route in /backend/app.js:
  const request = async () => {
    const response = await axios.get('http://localhost:5000/api/message');
    console.log(response.data);
  };

  useEffect(() => {
    request();
  });

  return <div>x</div>;
};

export default X;
