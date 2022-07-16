import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Post from '../components/Post';

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const examplePosts = [
    {
      id: '14443316-5a4d-4757-9a64-25b9e1206b42',
      user: '3c3191f7-71a2-4803-930a-1826c905e431',
      body: 'hello world',
      time: '2022-07-07T16:20:00Z',
      likes: [],
    },
    {
      id: '7359b119-a08a-4cc3-83cf-5b7518663919',
      user: '3c3191f7-71a2-4803-930a-1826c905e431',
      body: `lmao i don't even know what to say`,
      time: '2022-07-07T19:45:00Z',
      likes: [],
    },
    {
      id: '63765d23-b18a-49e6-859a-dd83f04b7d66',
      user: '3c3191f7-71a2-4803-930a-1826c905e431',
      body: `Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit`,
      time: '2022-07-07T22:00:00Z',
      likes: [],
    },
    {
      id: '3a655203-3016-43a9-9cfd-6042efae111f',
      user: '3c3191f7-71a2-4803-930a-1826c905e431',
      body: `Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit`,
      time: '2022-07-07T22:00:00Z',
      likes: [],
    },
    {
      id: 'a82874a2-9d82-470b-876c-e48844ac40e4',
      user: '3c3191f7-71a2-4803-930a-1826c905e431',
      body: 'welcome to the wired.',
      time: '2022-07-07T23:59:59Z',
      likes: [],
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="feedPage">
      {examplePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
