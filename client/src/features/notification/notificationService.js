import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const createNotification = async (notificationData, token) => {
  console.log('notification data:', notificationData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('/api/notifications/', notificationData, config);

  return response.data;
};

const fetchNotifications = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('/api/notifications/?userID=' + userID, config);

  return response.data;
};

const checkNotifications = async (userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put('/api/notifications/?userID=' + userID, {}, config);

  return response.data;
};

const notificationService = { createNotification, fetchNotifications, checkNotifications };

export default notificationService;
