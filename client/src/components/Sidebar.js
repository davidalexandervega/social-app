import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { logout, reset } from '../features/auth/authSlice';
import NewPost from './NewPost';

import '../assets/styles/Sidebar.scss';

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
  const { token, user } = useSelector((state) => state.auth);
  const username = user ? user.username : null;

  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const sidebarRef = useRef();

  // handle life-cycle transitions:
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        sidebarRef.current.classList.add('fade');
      }, 10);
    }
    if (token && !user) {
      sidebarRef.current.style.display = 'none';
      sidebarRef.current.classList.remove('fade');
    }
    if (user) {
      setTimeout(() => {
        sidebarRef.current.style.display = 'flex';
      }, 10);
      setTimeout(() => {
        sidebarRef.current.classList.add('fade');
      }, 100);
    }
  }, [token, user]);

  const loadFeed = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="sidebar" ref={sidebarRef}>
      {user ? (
        <span
          className="button labelButton sidebarProfile"
          onClick={() => navigate(`/users/` + username)}
        >
          <div className="sidebarPicture">
            {user && user.pictureID ? (
              <AdvancedImage
                cldImg={cloudinary
                  .image(`/social-app/pictures/${user.id}`)
                  .setVersion(user.pictureID)}
                className="sidebarImage"
              />
            ) : (
              <ProfileCircled height="50px" width="50px" strokeWidth="1.1" />
            )}
          </div>
          {username}
        </span>
      ) : (
        <span className="button labelButton sidebarButton" onClick={() => navigate('/login')}>
          <ProfileCircled height="2em" width="2em" strokeWidth="1.1" />
          profile
        </span>
      )}
      {user ? (
        <span
          className="button labelButton sidebarButton"
          onClick={() => navigate('/notifications')}
        >
          {notify === true ? (
            <BellNotification height="2em" width="2em" strokeWidth="1.1" color="rgb(255, 64, 0)" />
          ) : (
            <Bell height="2em" width="2em" strokeWidth="1.1" />
          )}
          notifications
        </span>
      ) : null}
      <span className="button labelButton sidebarButton" onClick={() => loadFeed()}>
        <Globe height="2em" width="2em" strokeWidth="1.1" />
        feed
      </span>
      {user ? (
        <span className="button labelButton sidebarButton" onClick={() => navigate('/settings')}>
          <Settings height="2em" width="2em" strokeWidth="1.1" />
          settings
        </span>
      ) : null}
      {user ? (
        <span className="button labelButton sidebarButton" onClick={() => onLogout()}>
          <LogOut height="2em" width="2em" strokeWidth="1.1" />
          logout
        </span>
      ) : (
        <span className="button labelButton sidebarButton" onClick={() => navigate('/login')}>
          <LogIn height="2em" width="2em" strokeWidth="1.1" />
          login
        </span>
      )}
      {user ? (
        <div className="newPostContainer">
          <NewPost newPostData={newPostData} setNewPost={setNewPost} />
        </div>
      ) : null}
    </header>
  );
};

export default Sidebar;
