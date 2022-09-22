import axios from 'axios';

// this includes the proxy definied in package.json
// otherwise you would need the full path to the server-side:
const API_URL = '/api/users/';

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post('/api/token/', userData);

  // save the user data in localStorage, including the token:
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }

  console.log(JSON.parse(localStorage.getItem('token')));

  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const fetchUser = async (username, token) => {
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

  const response = await axios.put(
    API_URL + 'edit-profile/?username=' + profileData.username,
    profileData,
    config
  );

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

const authService = {
  register,
  login,
  logout,
  fetchUser,
  editProfile,
  editUser,
  changePassword,
};

export default authService;
