import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';

import {
  ProfileCircled,
  Bell,
  BellNotification,
  Globe,
  Settings,
  LogIn,
  LogOut,
} from 'iconoir-react';

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { notify } = props;

  const loadFeed = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <ProfileCircled
        height="3em"
        width="3em"
        strokeWidth="0.75"
        className="button"
        onClick={() => navigate('/profile')}
      />
      {user ? (
        <>
          {notify === true ? (
            <BellNotification
              className="button notifyButton"
              height="3em"
              width="3em"
              strokeWidth="0.75"
              color="rgb(255, 64, 0)"
              onClick={() => navigate('/notifications')}
            />
          ) : (
            <Bell
              className="button"
              height="3em"
              width="3em"
              strokeWidth="0.75"
              onClick={() => navigate('/notifications')}
            />
          )}
        </>
      ) : (
        ''
      )}
      <Globe
        height="3em"
        width="3em"
        strokeWidth="0.75"
        className="button"
        onClick={() => loadFeed()}
      />
      {user ? (
        <Settings
          height="3em"
          width="3em"
          strokeWidth="0.75"
          className="button"
          onClick={() => navigate('/settings')}
        />
      ) : (
        ''
      )}
      {user ? (
        <LogOut
          height="3em"
          width="3em"
          strokeWidth="0.75"
          className="button"
          onClick={() => onLogout()}
        />
      ) : (
        <LogIn
          height="3em"
          width="3em"
          strokeWidth="0.75"
          className="button"
          onClick={() => navigate('/login')}
        />
      )}
    </header>
  );
};

export default Header;
