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
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  console.log(JSON.parse(localStorage.getItem('user')))

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
