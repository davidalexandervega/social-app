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

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { email, username, password, confirmPassword } = formData;

  const reEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const reUsername = /^[a-zA-Z0-9_]+$/;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorRef = useRef();

  const onRegister = () => {
    reEmail.test(email);
    reUsername.test(username);
    if (
      reEmail.test(email) &&
      reUsername.test(username) &&
      password &&
      password === confirmPassword
    ) {
      const userData = {
        email,
        username: username.toLowerCase(),
        password,
        id: uuidv4(),
        created: new Date(),
        picture: false,
        banner: false,
        bio: '',
        following: [],
        followers: [],
      };
      dispatch(register(userData));
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      if (!reUsername.test(username)) {
        errorRef.current.innerHTML = 'usernames must be alphanumeric & may contain underscores';
      }
      if (!reEmail.test(email)) {
        errorRef.current.innerHTML = 'invalid email';
      }
      if (password !== confirmPassword) {
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
