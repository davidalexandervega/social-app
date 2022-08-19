import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import DeleteReplyPrompt from './DeleteReplyPrompt';

import '../assets/styles/Post.scss';
import '../assets/styles/Reply.scss';
import { ProfileCircled, Heart, Cancel } from 'iconoir-react';

import { likeReply } from '../features/reply/replySlice';

const Reply = (props) => {
  const { reply, replyDelta } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  let userID = '';
  if (user) {
    userID = jwt(user.access).user_id;
  }

  const replyRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      replyRef.current.classList.add('fade', 'slide');
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const displayTime = () => {
    // returns the time since the reply rounded up to the nearest second:
    const seconds = Math.ceil((new Date() - new Date(reply.time)) / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h`;
    } else if (seconds < 604800) {
      return `${Math.floor(seconds / 86400)}d`;
    } else {
      return new Date(reply.time).toLocaleDateString();
    }
  };

  const [isLiked, setIsLiked] = useState({
    color: 'whitesmoke',
    placeholder: 0,
  });

  const onLikeReply = (reply) => {
    // the state update allows for the like/unlike to be reflected immediately to the user.
    // the placeholder and color change the value immediately to reflect
    // the state that will be returned and reinforced by the useEffect() call below:
    let replyData = {};
    if (reply.likes.includes(userID)) {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: -1,
      });
      replyData = {
        ...reply,
        likes: [...reply.likes].filter((like) => like !== userID),
      };
    } else {
      setIsLiked({
        color: 'rgb(212, 196, 240)',
        placeholder: 1,
      });
      replyData = {
        ...reply,
        likes: [...reply.likes, userID],
      };
    }

    dispatch(likeReply(replyData));
  };

  useEffect(() => {
    if (reply.likes.includes(userID)) {
      setIsLiked({
        color: 'rgb(212, 196, 240)',
        placeholder: 0,
      });
    } else {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: 0,
      });
    }
  }, [reply.likes, userID]);

  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <div className="postContainer">
      <div className="post reply" ref={replyRef}>
        <span className="postHeader">
          <span className="postUserPicture">
            <ProfileCircled height="2em" width="2em" strokeWidth="1" fill="whitesmoke" />
          </span>
          &nbsp;
          <span className="postUsername">@user</span>
          &nbsp;
          <span className="postTime">{displayTime()}</span>
        </span>
        <div className="postBody">{reply.body}</div>
        <div className="postActions">
          <span className="postLike" onClick={() => onLikeReply(reply)}>
            <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
            &nbsp;{reply.likes.length + isLiked.placeholder}
          </span>
          {reply.user === userID ? (
            <span className="postDelete" onClick={() => setDeleteMode(true)}>
              <Cancel className="postDeleteButton" strokeWidth="1.1" />
            </span>
          ) : (
            ''
          )}
        </div>
        {deleteMode === true ? (
          <DeleteReplyPrompt
            reply={reply}
            replyRef={replyRef}
            setDeleteMode={setDeleteMode}
            replyDelta={replyDelta}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Reply;
