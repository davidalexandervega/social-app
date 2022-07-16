import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import NewPost from './NewPost';

import { ProfileCircled, Bell, Globe, Settings, LogIn, LogOut } from 'iconoir-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const loadFeed = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="sidebar">
      <span className="button labelButton profileButton" onClick={() => navigate('/profile')}>
        <ProfileCircled height="2em" width="2em" strokeWidth="1.1" />
        profile
      </span>
      {user ? (
        <span className="button labelButton" onClick={() => navigate('/notifications')}>
          <Bell height="2em" width="2em" strokeWidth="1.1" />
          notifications
        </span>
      ) : (
        ''
      )}
      <span className="button labelButton" onClick={() => loadFeed()}>
        <Globe height="2em" width="2em" strokeWidth="1.1" />
        feed
      </span>
      {user ? (
        <span className="button labelButton" onClick={() => navigate('/settings')}>
          <Settings height="2em" width="2em" strokeWidth="1.1" />
          settings
        </span>
      ) : (
        ''
      )}
      {user ? (
        <span className="button labelButton" onClick={() => onLogout()}>
          <LogOut height="2em" width="2em" strokeWidth="1.1" />
          logout
        </span>
      ) : (
        <span className="button labelButton" onClick={() => navigate('/login')}>
          <LogIn height="2em" width="2em" strokeWidth="1.1" />
          login
        </span>
      )}
      {user ? <NewPost /> : ''}
    </header>
  );
};

export default Sidebar;
