import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import DeleteReplyPrompt from './DeleteReplyPrompt';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart, Cancel } from 'iconoir-react';

import { likeReply } from '../features/reply/replySlice';
import { createNotification } from '../features/notification/notificationSlice';

const Reply = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const { replyCreated } = useSelector((state) => state.reply);
  const { reply, replyDelta, post } = props;

  // initialize cloudinary:
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  // handle transition based on whether replies are being loaded
  // or a new reply is being added:
  const replyRef = useRef();

  useEffect(() => {
    if (replyCreated) {
      setTimeout(() => {
        replyRef.current.classList.add('fade');
      }, 10);
    } else {
      replyRef.current.classList.add('fade');
    }
  }, [replyCreated]);

  const displayTime = () => {
    // returns the time since reply creation rounded up to the nearest second:
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
    // the state that will be returned and replaced in the useEffect() call below:
    let replyData = {};
    if (reply.likes.includes(user.id)) {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: -1,
      });
      replyData = {
        ...reply,
        likes: [...reply.likes].filter((like) => like !== user.id),
      };
    } else {
      setIsLiked({
        color: 'rgb(212, 196, 240)',
        placeholder: 1,
      });
      replyData = {
        ...reply,
        likes: [...reply.likes, user.id],
      };
      if (reply.user !== user.id) {
        const notificationData = {
          id: uuidv4(),
          time: new Date(),
          creatorID: user.id,
          creatorUsername: username,
          recipientID: reply.user,
          type: 'like_post',
          object: post.id,
        };
        dispatch(createNotification(notificationData));
      }
    }

    dispatch(likeReply(replyData));
  };

  useEffect(() => {
    if (reply.likes.includes(user.id)) {
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
  }, [reply.likes, user.id]);

  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <div className="postContainer">
      <div className="post reply" ref={replyRef}>
        <span className="postHeader">
          <span className="postUserPicture">
            {reply.userPictureID ? (
              <AdvancedImage
                className="postUserImage"
                cldImg={cloudinary
                  .image(`/social-app/pictures/${reply.user}`)
                  .setVersion(reply.userPictureID)}
              />
            ) : (
              <ProfileCircled height="42px" width="42px" strokeWidth="1" fill="whitesmoke" />
            )}
          </span>
          <span className="postUsername">@{reply.username}</span>
          <span className="postTime">{displayTime()}</span>
        </span>
        <div className="postBody">
          <div className="postText">{reply.body}</div>
        </div>
        <div className="postActions">
          <span className="postLike" onClick={() => onLikeReply(reply)}>
            <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
            &nbsp;{reply.likes.length + isLiked.placeholder}
          </span>
          {reply.user === user.id ? (
            <span className="postDelete" onClick={() => setDeleteMode(true)}>
              <Cancel className="postDeleteButton" strokeWidth="1.1" />
            </span>
          ) : null}
        </div>
        {deleteMode === true ? (
          <DeleteReplyPrompt
            reply={reply}
            replyRef={replyRef}
            setDeleteMode={setDeleteMode}
            replyDelta={replyDelta}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Reply;
