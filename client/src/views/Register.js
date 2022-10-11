import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { register } from '../features/auth/authSlice';

import '../assets/styles/Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // handle render condition and transition:
  const viewRef = useRef();
  const registerRef = useRef();
  useEffect(() => {
    if (!token) {
      viewRef.current.classList.add('fade');
      setTimeout(() => {
        registerRef.current.classList.add('fade');
      }, 300);
    } else {
      navigate('/');
    }
  }, [navigate, token]);

  // initialize register form:
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const { email, username, password, confirmPassword } = formData;

  // regular expressions used to validate form data:
  const reEmail =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const reUsername = /^[a-zA-Z0-9_]+$/;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorRef = useRef();

  const onRegister = () => {
    errorRef.current.innerHTML = '';
    const validEmail = reEmail.test(email);
    const validUsername = reUsername.test(username);
    if (validEmail && validUsername && password && password === confirmPassword) {
      const userID = uuidv4();
      const userData = {
        email,
        username: username.toLowerCase(),
        password,
        id: userID,
        created: new Date(),
        pictureID: userID,
        bannerID: userID,
        bio: '',
        following: [],
        followers: [],
      };
      dispatch(register(userData));
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      if (!validUsername) {
        errorRef.current.innerHTML = 'usernames must be alphanumeric & may contain underscores';
      } else if (!validEmail) {
        errorRef.current.innerHTML = 'invalid email';
      } else if (password !== confirmPassword) {
        errorRef.current.innerHTML = 'passwords do not match';
      }
    }
  };

  return (
    <div className="loginPage" ref={viewRef}>
      <div className="viewBox register" ref={registerRef}>
        <form className="authForm registerForm">
          <div className="formItem">
            <label htmlFor="email" className="registerFormLabel">
              email
            </label>
            <input
              type="text"
              className="formControl"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              size="20"
            />
          </div>

          <div className="formItem">
            <label htmlFor="username" className="registerFormLabel">
              username
            </label>
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
            <label htmlFor="password" className="registerFormLabel">
              password
            </label>
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

          <div className="formItem">
            <label htmlFor="confirmPassword" className="registerFormLabel">
              confirm password
            </label>
            <input
              type="password"
              className="formControl"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              size="20"
            />
          </div>
          <div className="solidButton registerButton" onClick={() => onRegister()}>
            register
          </div>
        </form>
      </div>
      <div className="errorMessage" ref={errorRef}></div>
    </div>
  );
};

export default Register;
