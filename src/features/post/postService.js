import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// this includes the proxy definied in package.json
// otherwise you would need the full path to the server-side:
const API_URL = '/api/posts/';

const createPost = async (newPostData, token) => {
  // set the correct header with the token to access the protected route:
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newPostData, config);

  return response.data;
};

const fetchAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'all', config);

  return response.data;
};

const fetchUserPosts = async (username, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'users/?username=' + username, config);

  return response.data;
};

const fetchPostById = async (postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '?id=' + postID + '&mode=origin', config);

  return response.data;
};

const likePost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + postData.id + '/like', postData, config);

  return response.data;
};

const deletePost = async (postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postID, config);

  return response.data;
};

const postService = {
  createPost,
  fetchUserPosts,
  fetchAllPosts,
  fetchPostById,
  likePost,
  deletePost,
};

export default postService;
