import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileCircled, Heart, ChatBubbleEmpty } from 'iconoir-react';

import '../assets/styles/Post.scss';
import '../assets/styles/Notification.scss';

const Notification = (props) => {
  const { notification } = props;

  const navigate = useNavigate();

  const notificationRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      notificationRef.current.classList.add('fade', 'slide');
    }, 10);
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
    } else {
      return new Date(notification.time).toLocaleDateString();
    }
  };

  const onClickAction = () => {
    if (
      notification.type === 'like_post' ||
      notification.type === 'reply_post' ||
      notification.type === 'like_reply'
    ) {
      navigate(`/posts/${notification.object}`);
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
          <ProfileCircled strokeWidth="1.1" fill="whitesmoke" />
        ) : null}
      </div>
      <div className="notificationCreator">@{notification.creator_name}</div>
      <div className="notificationAction" onClick={() => onClickAction(notification.type)}>
        {notification.type.includes('like_post') ? 'liked your post.' : null}
        {notification.type.includes('reply_post') ? 'replied to your post.' : null}
        {notification.type.includes('like_reply') ? 'liked your reply.' : null}
        {notification.type.includes('follow_user') ? 'started following you.' : null}
      </div>
      <div className="notificationTime">{displayTime()}</div>
    </div>
  );
};

export default Notification;
