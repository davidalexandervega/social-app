import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  login,
  editUser,
  changePassword,
  toggleUpdate,
  fetchUser,
} from '../features/auth/authSlice';

import '../assets/styles/Settings.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, updating } = useSelector((state) => state.auth);

  const { username } = user;

  const settingsRef = useRef();
  const settingsHeaderRef = useRef();
  useEffect(() => {
    if (user.id) {
      const timer = setTimeout(() => {
        settingsHeaderRef.current.classList.add('fade');
        settingsRef.current.classList.add('fade');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [user.id]);

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSaveChanges = () => {
    if (username !== newUsername || user.email !== newEmail) {
      const userData = {
        userID: user.id,
        username,
        newUsername,
        newEmail,
        password,
      };
      dispatch(editUser(userData));
      setTimeout(() => {
        settingsHeaderRef.current.classList.remove('fade');
        settingsRef.current.classList.remove('fade');
      }, 10);
    }
  };

  useEffect(() => {
    if (updating === true) {
      const loginData = {
        username: newUsername ? newUsername : username,
        password,
      };
      dispatch(login(loginData));
      dispatch(fetchUser(user.id));
      dispatch(toggleUpdate());
      setTimeout(() => {
        navigate(`/users/${loginData.username}`);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updating]);

  const onChangePassword = () => {
    if (currentPassword !== newPassword && newPassword === confirmNewPassword) {
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
      setTimeout(() => {
        navigate(`/users/${username}`);
      }, 1000);
    }
  };

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
              type="text"
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
