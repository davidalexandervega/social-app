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

  const registerRef = useRef();
  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        registerRef.current.classList.add('fade');
      }, 700);
      return () => clearTimeout(timer);
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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister = () => {
    if (email && username && password && password === confirmPassword) {
      const userData = {
        email,
        username,
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
    }
  };

  return (
    <div className="loginPage">
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
          <div className="solidButton longButton registerButton" onClick={() => onRegister()}>
            register
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
