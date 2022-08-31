import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchNotifications, checkNotifications } from '../features/notification/notificationSlice';

import Notification from '../components/Notification';

const Notifications = (props) => {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notification);

  const { notify, setNotify } = props;

  useEffect(() => {
    dispatch(fetchNotifications());
    if (notify === true) {
      setNotify(false);
      dispatch(checkNotifications());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notificationsView">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
