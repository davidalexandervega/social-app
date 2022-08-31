import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';

import { fetchAllPosts } from '../features/post/postSlice';

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchAllPosts());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="feedView">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
