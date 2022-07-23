import React from 'react';
import { useDispatch } from 'react-redux';

import '../assets/styles/DeletePostPrompt.scss';

import { removePost, deletePost } from '../features/post/postSlice';

const DeletePostPrompt = (props) => {
  const dispatch = useDispatch();
  const { post, postRef, setDeleteMode } = props;

  const onDelete = async (postID) => {
    postRef.current.classList.remove('fade');
    const timer = setTimeout(() => {
      dispatch(removePost(postID));
      dispatch(deletePost(postID));
    }, 750);
    return () => clearTimeout(timer);
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
