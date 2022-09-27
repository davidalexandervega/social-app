import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, editUser, changePassword, fetchUser, reset } from '../features/auth/authSlice';
import { disablePost, enablePost } from '../features/post/postSlice';

import '../assets/styles/Settings.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, relog, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { username } = user;

  const settingsRef = useRef();
  const settingsHeaderRef = useRef();
  useEffect(() => {
    if (user.id) {
      dispatch(disablePost());
      setTimeout(() => {
        settingsHeaderRef.current.classList.add('fade');
        settingsRef.current.classList.add('fade');
      }, 700);
    } else {
      navigate('/');
    }
    return () => {
      dispatch(enablePost());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState({
    newUsername: username,
    newEmail: user.email,
    password: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { newUsername, newEmail, password, currentPassword, newPassword, confirmNewPassword } =
    formData;

  const reEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const reUsername = /^[a-zA-Z0-9_]+$/;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSaveChanges = () => {
    if (
      (username !== newUsername && reUsername.test(newUsername)) ||
      (user.email !== newEmail && reEmail.test(newEmail))
    ) {
      const userData = {
        userID: user.id,
        username: username.toLowerCase(),
        newUsername,
        newEmail,
        password,
      };
      dispatch(editUser(userData));
      setTimeout(() => {
        settingsHeaderRef.current.classList.remove('fade');
        settingsRef.current.classList.remove('fade');
      }, 10);
    } else {
      if (!reUsername.test(newUsername)) {
        errorRef.current.innerHTML = 'usernames are alphanumeric and may contain underscores';
      }
      if (!reEmail.test(newEmail)) {
        errorRef.current.innerHTML = 'invalid email';
      }
    }
  };

  const onChangePassword = () => {
    if (
      currentPassword !== newPassword &&
      newPassword !== '' &&
      newPassword === confirmNewPassword
    ) {
      const passwordData = {
        userID: user.id,
        username,
        currentPassword,
        newPassword,
      };
      dispatch(changePassword(passwordData));
      setTimeout(() => {
        settingsHeaderRef.current.classList.remove('fade');
        settingsRef.current.classList.remove('fade');
      }, 10);
    } else if (newPassword !== confirmNewPassword) {
      errorRef.current.innerHTML = 'passwords do not match';
    }
  };

  useEffect(() => {
    if (relog === true) {
      const loginData = {
        username: newUsername ? newUsername : username,
        password,
      };
      dispatch(login(loginData));
      dispatch(fetchUser(user.id));
      dispatch(reset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relog]);

  const errorRef = useRef();
  useEffect(() => {
    if (isError) {
      settingsHeaderRef.current.classList.add('fade');
      settingsRef.current.classList.add('fade');
      errorRef.current.innerHTML = message;
      dispatch(reset());
    } else if (isSuccess) {
      setTimeout(() => {
        navigate(`/users/${newUsername ? newUsername : username}`);
      }, 1000);
    }
  }, [dispatch, navigate, username, newUsername, message, isError, isSuccess]);

  return (
    <div className="view">
      <div className="editViewHeader" ref={settingsHeaderRef}>
        settings
      </div>
      <div className="viewBox settings" ref={settingsRef}>
        <form className="authForm settingsForm">
          <div className="formItem">
            <label htmlFor="newEmail">email </label>
            <input
              type="email"
              className="formControl"
              id="newEmail"
              name="newEmail"
              value={newEmail}
              onChange={onChange}
              size="20"
            />
          </div>

          <div className="formItem">
            <label htmlFor="username">username </label>
            <input
              type="text"
              className="formControl"
              id="newUsername"
              name="newUsername"
              value={newUsername}
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
          <div className="solidButton longButton settingsButton" onClick={() => onSaveChanges()}>
            save changes
          </div>
        </form>

        <div className="errorMessage" ref={errorRef}></div>

        <form className="authForm settingsForm">
          <div className="formItem">
            <label htmlFor="currentPassword">current password </label>
            <input
              type="password"
              className="formControl"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={onChange}
              size="20"
            />
          </div>
          <div className="formItem">
            <label htmlFor="newPassword">new password </label>
            <input
              type="password"
              className="formControl"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={onChange}
              size="20"
            />
          </div>
          <div className="formItem">
            <label htmlFor="confirmNewPassword">confirm password </label>
            <input
              type="password"
              className="formControl"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={onChange}
              size="20"
            />
          </div>
          <div
            className="solidButton longButton changePassword settingsButton"
            onClick={() => onChangePassword()}
          >
            change password
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
