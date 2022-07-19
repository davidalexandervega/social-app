import axios from 'axios';

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

const fetchPosts = async (fetchCriteria, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, fetchCriteria, config);

  return response.data;
};

const deletePost = async (postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL, postID, config);

  return response.data;
};

const postService = {
  createPost,
  fetchPosts,
  deletePost,
};

export default postService;
