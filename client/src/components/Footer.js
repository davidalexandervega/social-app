import React from 'react';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';

import { ProfileCircled } from 'iconoir-react';

const Footer = (props) => {
  const { newPostData, setNewPost } = props;
  const { user } = useSelector((state) => state.auth);
  return (
    <footer className="footer">
      {user ? <NewPost newPostData={newPostData} setNewPost={setNewPost} /> : ''}
    </footer>
  );
};

export default Footer;
