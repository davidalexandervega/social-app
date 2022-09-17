import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, editUser, toggleUpdate } from '../features/auth/authSlice';

import '../assets/styles/Settings.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userID, username, userEmail, updating } = useSelector((state) => state.auth);

  const settingsRef = useRef();
  const settingsHeaderRef = useRef();
  useEffect(() => {
    if (userID) {
      const timer = setTimeout(() => {
        settingsHeaderRef.current.classList.add('fade');
        settingsRef.current.classList.add('fade');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [userID]);

  const [formData, setFormData] = useState({
    newUsername: username,
    newEmail: userEmail,
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
    //if (username !== newUsername && userEmail !== newEmail) {
    const userData = {
      userID,
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
    //}
  };

  useEffect(() => {
    if (updating === true) {
      const loginData = { username, password };
      dispatch(login(loginData));
      dispatch(toggleUpdate());
      setTimeout(() => {
        navigate(`/users/${username}`);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updating]);

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
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
              className="formControl"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={onChange}
              size="20"
            />
          </div>
          <div className="solidButton longButton changePassword settingsButton">
            change password
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
