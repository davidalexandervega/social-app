import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginBanner from '../components/LoginBanner';
import LoginAnimation from '../components/LoginAnimation';
import { login, reset } from '../features/auth/authSlice';

import '../assets/styles/Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isError, isSuccess, message } = useSelector((state) => state.auth);

  // initialize login form:
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;

  // handle render condition and transition:
  const loginRef = useRef();
  useEffect(() => {
    if (token) navigate('/');
    setTimeout(() => {
      if (loginRef.current) loginRef.current.classList.add('fade');
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const loginData = {
      username,
      password,
    };

    dispatch(login(loginData));
  };

  const errorRef = useRef();
  useEffect(() => {
    if (isError) {
      errorRef.current.innerHTML = 'incorrect username or password';
    }
    if (isSuccess) {
      errorRef.current.innerHTML = '';
      dispatch(reset());
      navigate('/');
    }
  }, [token, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="loginPage" ref={loginRef}>
      <span className="siteBanner">social</span>
      <LoginBanner />
      <div className="formContainer">
        <form className="authForm">
          <div className="formItem">
            <label htmlFor="username">username </label>
            <input
              type="text"
              className="formControl"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              size="20"
            />
          </div>

          <div className="formItem">
            <label htmlFor="password">password </label>
            <input
              type="password"
              className="formControl"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              size="20"
            />
          </div>
        </form>
        <div className="errorMessage" ref={errorRef}></div>
        <span onClick={() => onSubmit()} className="button labelButton loginButton">
          login
        </span>
      </div>
      <span onClick={() => navigate('/register')} className="button labelButton registerButton">
        register
      </span>
      <LoginAnimation />
    </div>
  );
};

export default Login;
