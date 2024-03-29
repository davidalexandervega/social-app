import axios from 'axios';

// this includes the proxy definied in package.json
// otherwise you would need the full path to the server-side:
const API_URL = '/api/replies/';

const createReply = async (newReplyData, token) => {
  // set the correct header with the token to access the protected route:

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newReplyData, config);

  return response.data;
};

const fetchReplies = async (postID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('/api/replies/?postID=' + postID, config);

  return response.data;
};

const likeReply = async (replyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + 'like/?id=' + replyData.id, replyData, config);

  return response.data;
};

const deleteReply = async (replyID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '?id=' + replyID, config);

  return response.data;
};

const replyService = {
  createReply,
  fetchReplies,
  likeReply,
  deleteReply,
};

export default replyService;
