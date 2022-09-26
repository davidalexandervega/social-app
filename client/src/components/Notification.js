import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCircled, Heart, ChatBubbleEmpty, VerifiedUser } from 'iconoir-react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import '../assets/styles/Post.scss';
import '../assets/styles/Notification.scss';

const Notification = (props) => {
  const { notification } = props;

  const navigate = useNavigate();

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  const notificationRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      notificationRef.current.classList.add('fade');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const displayTime = () => {
    // returns the time since the post rounded up to the nearest second:
    const seconds = Math.ceil((new Date() - new Date(notification.time)) / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h`;
    } else if (seconds < 604800) {
      return `${Math.floor(seconds / 86400)}d`;
    } else if (seconds < 2630000 * 3) {
      return `${Math.floor(seconds / 604800)}w`;
    } else if (seconds < 31536000) {
      return `${Math.floor(seconds / 2630000)}mo`;
    } else {
      return `${Math.floor(seconds / 31536000)}y`;
    }
  };

  const onClickAction = () => {
    if (
      notification.type === 'like_post' ||
      notification.type === 'reply_post' ||
      notification.type === 'like_reply'
    ) {
      navigate(`/posts/${notification.object}`);
    } else if (notification.type === 'follow_user') {
      navigate(`/users/${notification.creatorUsername}`);
    }
  };

  return (
    <div className="post notification" ref={notificationRef}>
      <div className="notificationIcon">
        {notification.type.includes('like') ? <Heart strokeWidth="1.1" fill="whitesmoke" /> : null}
        {notification.type.includes('reply') ? (
          <ChatBubbleEmpty strokeWidth="1.1" fill="whitesmoke" />
        ) : null}
        {notification.type.includes('follow') ? (
          <VerifiedUser strokeWidth="1.1" fill="whitesmoke" />
        ) : null}
      </div>
      <span className="notificationCreatorPicture">
        {notification.creatorHasPicture ? (
          <AdvancedImage
            className="notificationCreatorImage"
            cldImg={cloudinary.image(`/pictures/${notification.creatorID}`).setVersion(Date.now())}
          />
        ) : (
          <ProfileCircled height="42px" width="42px" strokeWidth="1" fill="whitesmoke" />
        )}
      </span>
      <div
        className="notificationCreator"
        onClick={() => navigate(`/users/${notification.creatorUsername}`)}
      >
        @{notification.creatorUsername}
      </div>
      <div className="notificationAction" onClick={() => onClickAction(notification.type)}>
        {notification.type.includes('like_post') ? 'liked your post.' : null}
        {notification.type.includes('reply_post') ? 'replied to your post.' : null}
        {notification.type.includes('like_reply') ? 'liked your reply.' : null}
        {notification.type.includes('follow_user') ? 'followed you.' : null}
      </div>
      <div className="notificationTime">{displayTime()}</div>
    </div>
  );
};

export default Notification;
