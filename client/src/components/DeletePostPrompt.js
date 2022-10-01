import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/DeletePostPrompt.scss';

import { removePost, deletePost } from '../features/post/postSlice';

const DeletePostPrompt = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, postRef, setDeleteMode, postView, postViewContainerRef } = props;

  // handling the post deletion based on the current view:
  const onDelete = async (postID) => {
    if (postView === true) {
      dispatch(deletePost(postID));
      setTimeout(() => {
        postViewContainerRef.current.classList.remove('fade');
      }, 10);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      postRef.current.classList.remove('fade');
      setTimeout(() => {
        dispatch(removePost(postID));
        dispatch(deletePost(postID));
      }, 1000);
    }
  };

  return (
    <div className="deletePostPrompt">
      <span className="deletePostWarning">delete post? this cannot be undone.</span>
      <div className="deletePostActions">
        <span className="labelButton solidButton redButton" onClick={() => onDelete(post.id)}>
          delete
        </span>
        <span className="labelButton solidButton" onClick={() => setDeleteMode(false)}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default DeletePostPrompt;
