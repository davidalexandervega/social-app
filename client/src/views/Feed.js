import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';

import { fetchAllPosts } from '../features/post/postSlice';
import { fetchNotifications } from '../features/notification/notificationSlice';
import { expandPost } from '../features/reply/replySlice';

const Feed = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchNotifications());
    return () => {
      dispatch(expandPost(null));
    };
  }, [dispatch]);

  return (
    <div className="view">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
