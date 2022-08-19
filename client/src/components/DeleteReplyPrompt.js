import React from 'react';
import { useDispatch } from 'react-redux';

import '../assets/styles/DeletePostPrompt.scss';

import { removeReply, deleteReply } from '../features/reply/replySlice';

const DeleteReplyPrompt = (props) => {
  const dispatch = useDispatch();
  const { reply, replyRef, setDeleteMode, replyDelta } = props;

  const onDelete = async (replyID) => {
    replyRef.current.classList.remove('fade');
    const timer = setTimeout(() => {
      dispatch(removeReply(replyID));
      dispatch(deleteReply(replyID));
      replyDelta.current--;
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="deletePostPrompt">
      <span className="deletePostWarning">delete reply? this cannot be undone.</span>
      <div className="deletePostActions">
        <span className="labelButton solidButton redButton" onClick={() => onDelete(reply.id)}>
          delete
        </span>
        <span className="labelButton solidButton" onClick={() => setDeleteMode(false)}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default DeleteReplyPrompt;
