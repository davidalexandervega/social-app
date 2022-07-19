import React from 'react';
import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';

import { Minus, Plus } from 'iconoir-react';

const Footer = (props) => {
  const { newPostData, setNewPost } = props;
  const { user } = useSelector((state) => state.auth);

  const [mode, setMode] = useState('collapsed');

  const switchMode = () => {
    if (mode === 'collapsed') {
      setMode('expanded');
    }
    if (mode === 'expanded') {
      setMode('collapsed');

      setNewPost((prevState) => ({
        ...prevState,
        newPostBody: '',
      }));
    }
  };

  useEffect(() => {
    if (newPostData.newPostBody !== '') {
      setMode('expanded');
    }
  }, [newPostData.newPostBody]);

  return (
    <div>
      {user ? (
        <footer className="footer">
          {mode === 'collapsed' ? (
            <span className="labelButton solidButton newPostButton" onClick={() => switchMode()}>
              new post &nbsp;
              <Plus />
            </span>
          ) : (
            <NewPost
              newPostData={newPostData}
              setNewPost={setNewPost}
              mode={mode}
              switchMode={switchMode}
            />
          )}
        </footer>
      ) : (
        ''
      )}
    </div>
  );
};

export default Footer;
