import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAllPosts } from '../features/post/postSlice';
import { fetchNotifications } from '../features/notification/notificationSlice';
import { expandPost } from '../features/reply/replySlice';

import Post from '../components/Post';
import { BallTriangle } from 'react-loading-icons';

const Feed = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchNotifications(user.id));
    return () => {
      dispatch(expandPost(null));
    };
  }, [dispatch, user.id]);

  return (
    <div className="view">
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </>
      ) : (
        <span className="loadingContainer">
          <BallTriangle className="loadingIcon" stroke="#000000" strokeOpacity="0.7" height="2em" />
        </span>
      )}
    </div>
  );
};

export default Feed;
