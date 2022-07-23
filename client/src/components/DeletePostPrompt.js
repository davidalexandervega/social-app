import React from 'react';
import { useDispatch } from 'react-redux';

import '../assets/styles/DeletePostPrompt.scss';

import { deletePost } from '../features/post/postSlice';

const DeletePostPrompt = (props) => {
  const dispatch = useDispatch();
  const { post, setDeleteMode } = props;

  const onDelete = (postID) => {
    dispatch(deletePost(postID));
  };

  return (
    <div className="deletePostPrompt">
      <span className="deletePostWarning">delete post? this cannot be undone.</span>
      <div className="deletePostActions">
        <span className="labelButton solidButton redButton" onClick={() => onDelete(post.id)}>
          delete
        </span>
        <span className="labelButton solidButton" onClick={() => setDeleteMode('off')}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default DeletePostPrompt;
