import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';

import { fetchAllPosts } from '../features/post/postSlice';
import { fetchNotifications } from '../features/notification/notificationSlice';
import { expandPost } from '../features/reply/replySlice';

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchAllPosts());
      dispatch(fetchNotifications());
    }
    return () => {
      dispatch(expandPost(null));
    };
  }, [token, navigate, dispatch]);

  return (
    <div className="view">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
