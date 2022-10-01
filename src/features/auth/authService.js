import axios from 'axios';
// handle django's CSRF verification conflict:
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// this includes the proxy definied in package.json
// otherwise you would need the full path to the server-side:
const API_URL = '/api/users/';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post('/api/token/', userData);

  // save the token in localStorage:
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }

  console.log(JSON.parse(localStorage.getItem('token')));

  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const fetchUser = async (userID, token) => {
  // set the correct header with the token to access the protected route:
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '?userID=' + userID, config);

  return response.data;
};

const fetchProfile = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '?username=' + username, config);

  return response.data;
};

const editProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'edit-profile', profileData, config);

  return response.data;
};

const editUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + 'edit-user/?username=' + userData.username,
    userData,
    config
  );

  return response.data;
};

const changePassword = async (passwordData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + 'change-password/?username=' + passwordData.username,
    passwordData,
    config
  );

  return response.data;
};

const followUser = async (followData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + 'follow-user/?userID=' + followData.targetID,
    followData,
    config
  );

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  fetchUser,
  fetchProfile,
  editProfile,
  editUser,
  changePassword,
  followUser,
};

export default authService;