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

  console.log(response.data);

  return response.data;
};

const notificationService = { createNotification, fetchNotifications };

export default notificationService;
