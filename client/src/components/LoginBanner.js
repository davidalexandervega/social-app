import React from 'react';
import { useEffect, useRef } from 'react';
import '../assets/styles/LoginBanner.scss';

const LoginBanner = () => {
  const helloRef = useRef();
  const helloCountRef = useRef(0);

  useEffect(() => {
    const hello = setInterval(() => {
      const words = [
        'enter',
        'أدخل',
        '进入',
        'entrer',
        'eintreten',
        'masuk',
        'entrare',
        '入力',
        '입력하다',
        'входить',
        'entrar',
        'stiga på',
      ];

      helloRef.current.innerHTML = words[helloCountRef.current];

      if (helloCountRef.current === words.length - 1) {
        helloCountRef.current = 0;
      } else {
        helloCountRef.current++;
      }
    }, 1000);
    return () => clearInterval(hello);
  }, []);

  return <div className="loginBanner" ref={helloRef}></div>;
};

export default LoginBanner;
