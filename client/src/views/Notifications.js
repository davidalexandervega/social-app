import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchNotifications, checkNotifications } from '../features/notification/notificationSlice';

import Notification from '../components/Notification';

const Notifications = (props) => {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notification);
  const { user } = useSelector((state) => state.auth);

  const { notify, setNotify } = props;

  useEffect(() => {
    if (notify === true) {
      setNotify(false);
      dispatch(checkNotifications(user.id));
    } else {
      dispatch(fetchNotifications(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="view">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
      {notifications.length === 0 ? (
        <span className="clientMessage">you have no new notifications.</span>
      ) : null}
    </div>
  );
};

export default Notifications;
