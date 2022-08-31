import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchNotifications } from '../features/notification/notificationSlice';

import Notification from '../components/Notification';

const Notifications = () => {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="notificationsView">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
