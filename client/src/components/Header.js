import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

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
  const { token, user } = useSelector((state) => state.auth);
  const username = user ? user.username : null;

  const { notify } = props;

  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

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
      {token ? (
        <span className="button" onClick={() => navigate(`/users/` + username)}>
          <div className="headerPicture">
            {user && user.pictureID ? (
              <AdvancedImage
                cldImg={cloudinary.image(`/pictures/${user.id}`).setVersion(Date.now())}
                className="headerImage"
              />
            ) : (
              <ProfileCircled className="button" height="48px" width="48px" strokeWidth="0.75" />
            )}
          </div>
        </span>
      ) : (
        <span className="button labelButton sidebarButton" onClick={() => navigate('/login')}>
          <ProfileCircled className="button" height="48px" width="48px" strokeWidth="0.75" />
        </span>
      )}
      {token ? (
        <>
          {notify === true ? (
            <BellNotification
              className="button notifyButton"
              height="48px"
              width="48px"
              strokeWidth="0.75"
              color="rgb(255, 64, 0)"
              onClick={() => navigate('/notifications')}
            />
          ) : (
            <Bell
              className="button"
              height="48px"
              width="48px"
              strokeWidth="0.75"
              onClick={() => navigate('/notifications')}
            />
          )}
        </>
      ) : null}
      <Globe
        height="48px"
        width="48px"
        strokeWidth="0.75"
        className="button"
        onClick={() => loadFeed()}
      />
      {token ? (
        <Settings
          height="48px"
          width="48px"
          strokeWidth="0.75"
          className="button"
          onClick={() => navigate('/settings')}
        />
      ) : null}
      {token ? (
        <LogOut
          height="48px"
          width="48px"
          strokeWidth="0.75"
          className="button"
          onClick={() => onLogout()}
        />
      ) : (
        <LogIn
          height="48px"
          width="48px"
          strokeWidth="0.75"
          className="button"
          onClick={() => navigate('/login')}
        />
      )}
    </header>
  );
};

export default Header;
