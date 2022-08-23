import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/DeletePostPrompt.scss';

import { removePost, deletePost } from '../features/post/postSlice';

const DeletePostPrompt = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, postRef, setDeleteMode, postView } = props;

  const onDelete = async (postID) => {
    if (postView === true) {
      dispatch(deletePost(postID));
      navigate('/', { state: { deletedPost: postID } });
    } else {
      postRef.current.classList.remove('fade');
      const timer = setTimeout(() => {
        dispatch(removePost(postID));
        dispatch(deletePost(postID));
      }, 1000);
      return () => clearTimeout(timer);
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
