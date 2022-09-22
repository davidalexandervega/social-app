import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import NewPost from './NewPost';

import {
  ProfileCircled,
  Bell,
  Globe,
  Settings,
  LogIn,
  LogOut,
  BellNotification,
} from 'iconoir-react';

const Sidebar = (props) => {
  const { newPostData, setNewPost, notify } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, username } = useSelector((state) => state.auth);

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
      <span className="button labelButton" onClick={() => navigate(`/users/` + username)}>
        <ProfileCircled height="2em" width="2em" strokeWidth="1.1" />
        profile
      </span>
      {token ? (
        <span className="button labelButton" onClick={() => navigate('/notifications')}>
          {notify === true ? (
            <BellNotification height="2em" width="2em" strokeWidth="1.1" color="rgb(255, 64, 0)" />
          ) : (
            <Bell height="2em" width="2em" strokeWidth="1.1" />
          )}
          notifications
        </span>
      ) : null}
      <span className="button labelButton" onClick={() => loadFeed()}>
        <Globe height="2em" width="2em" strokeWidth="1.1" />
        feed
      </span>
      {token ? (
        <span className="button labelButton" onClick={() => navigate('/settings')}>
          <Settings height="2em" width="2em" strokeWidth="1.1" />
          settings
        </span>
      ) : null}
      {token ? (
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
      {token ? <NewPost newPostData={newPostData} setNewPost={setNewPost} /> : ''}
    </header>
  );
};

export default Sidebar;
