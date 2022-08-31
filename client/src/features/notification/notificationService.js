import axios from 'axios';

const createNotification = async (notificationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('/api/notifications/', notificationData, config);

  return response.data;
};

const fetchNotifications = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('/api/notifications/', config);

  return response.data;
};

const checkNotifications = async (_, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log('checking notifications...');

  const response = await axios.put('/api/notifications/', {}, config);

  console.log('notifications checked!');
  console.log(response.data);

  return response.data;
};

const notificationService = { createNotification, fetchNotifications, checkNotifications };

export default notificationService;
