import React from 'react';
import { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { useSelector } from 'react-redux';

import { Plus } from 'iconoir-react';

const Footer = (props) => {
  const { newPostData, setNewPost } = props;
  const { token } = useSelector((state) => state.auth);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (newPostData.newPostBody !== '') {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [newPostData.newPostBody]);

  return (
    <div>
      {token ? (
        <footer className="footer">
          {!expanded ? (
            <span
              className="labelButton solidButton newPostButton"
              onClick={() => setExpanded(true)}
            >
              new post &nbsp;
              <Plus />
            </span>
          ) : (
            <NewPost
              newPostData={newPostData}
              setNewPost={setNewPost}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          )}
        </footer>
      ) : null}
    </div>
  );
};

export default Footer;
