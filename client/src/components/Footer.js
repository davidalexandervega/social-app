import React from 'react';
import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';

import { Plus } from 'iconoir-react';

const Footer = (props) => {
  const { newPostData, setNewPost, feedRef, pageBottomRef } = props;
  const { user } = useSelector((state) => state.auth);

  const [mode, setMode] = useState('collapsed');

  useEffect(() => {
    if (newPostData.newPostBody !== '') {
      setMode('expanded');
    } else {
      setMode('collapsed');
    }
  }, [newPostData.newPostBody]);

  return (
    <div>
      {user ? (
        <footer className="footer">
          {mode === 'collapsed' ? (
            <span
              className="labelButton solidButton newPostButton"
              onClick={() => setMode('expanded')}
            >
              new post &nbsp;
              <Plus />
            </span>
          ) : (
            <NewPost
              newPostData={newPostData}
              setNewPost={setNewPost}
              mode={mode}
              setMode={setMode}
              feedRef={feedRef}
              pageBottomRef={pageBottomRef}
            />
          )}
        </footer>
      ) : null}
    </div>
  );
};

export default Footer;
