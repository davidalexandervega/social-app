import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import DeletePostPrompt from './DeletePostPrompt';
import NewReply from './NewReply';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart, Cancel, ChatBubbleEmpty } from 'iconoir-react';

import { likePost } from '../features/post/postSlice';
import { expandPost, reset as resetReplies } from '../features/reply/replySlice';
import { createNotification } from '../features/notification/notificationSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID, username, userPicture } = useSelector((state) => state.auth);
  const { expandedPost } = useSelector((state) => state.reply);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  const postRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      postRef.current.classList.add('fade');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const displayTime = () => {
    // returns the time since the post rounded up to the nearest second:
    const seconds = Math.ceil((new Date() - new Date(post.time)) / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h`;
    } else if (seconds < 604800) {
      return `${Math.floor(seconds / 86400)}d`;
    } else {
      return new Date(post.time).toLocaleDateString();
    }
  };

  const onPostView = (postID) => {
    navigate(`/posts/${postID}`, { state: { replyDelta: replyDelta } });
  };

  const [isLiked, setIsLiked] = useState({
    color: 'whitesmoke',
    placeholder: 0,
  });

  const onLikePost = (post) => {
    // the state update allows for the like/unlike to be reflected immediately to the user.
    // the placeholder and color change the value immediately to reflect
    // the state that will be returned and reinforced by the useEffect() call below:
    let postData = {};
    if (post.likes.includes(userID)) {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: -1,
      });
      postData = {
        ...post,
        likes: [...post.likes].filter((like) => like !== userID),
      };
    } else {
      setIsLiked({
        color: 'rgb(212, 196, 240)',
        placeholder: 1,
      });
      postData = {
        ...post,
        likes: [...post.likes, userID],
      };
      if (post.user !== userID) {
        const notificationData = {
          id: uuidv4(),
          time: new Date(),
          creator_id: userID,
          creator_name: username,
          target_id: post.user,
          type: 'like_post',
          object: post.id,
        };
        dispatch(createNotification(notificationData));
      }
    }

    dispatch(likePost(postData));
  };

  useEffect(() => {
    if (post.likes.includes(userID)) {
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
  }, [post.likes, userID]);

  const [deleteMode, setDeleteMode] = useState(false);

  const replyDelta = useRef(0);

  const onReplyPost = (postID) => {
    if (expandedPost === postID) {
      dispatch(resetReplies());
    } else {
      dispatch(resetReplies());
      dispatch(expandPost(postID));
    }
  };

  return (
    <div className="postContainer">
      <div className="post" ref={postRef}>
        <span className="postHeader">
          <span className="postUserPicture">
            {post.userPicture ? (
              <AdvancedImage
                className="postUserImage"
                cldImg={cloudinary.image(`/pictures/${post.user}`).setVersion(Date.now())}
              />
            ) : (
              <ProfileCircled height="42px" width="42px" strokeWidth="1" fill="whitesmoke" />
            )}
          </span>
          &nbsp;
          <span className="postUsername" onClick={() => navigate(`/users/${post.username}`)}>
            @{post.username}
          </span>
          &nbsp;
          <span className="postTime">{displayTime()}</span>
        </span>
        <div className="postBody" onClick={() => onPostView(post.id)}>
          {post.image === true ? (
            <AdvancedImage cldImg={cloudinary.image(`/posts/${post.id}`)} className="feedImage" />
          ) : null}
          <div className="postText">{post.body}</div>
        </div>
        <div className="postActions">
          <span className="postLike" onClick={() => onLikePost(post)}>
            <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
            &nbsp;{post.likes.length + isLiked.placeholder}
          </span>
          <span className="postReply" onClick={() => onReplyPost(post.id)}>
            <ChatBubbleEmpty className="button postReplyButton" strokeWidth="1.1" />
            &nbsp;{post.replies.length + replyDelta.current}
          </span>
          {post.user === userID ? (
            <span className="postDelete" onClick={() => setDeleteMode(true)}>
              <Cancel className="postDeleteButton" strokeWidth="1.1" />
            </span>
          ) : (
            ''
          )}
        </div>
        {deleteMode === true ? (
          <DeletePostPrompt post={post} postRef={postRef} setDeleteMode={setDeleteMode} />
        ) : (
          ''
        )}
      </div>
      {expandedPost === post.id ? (
        <div className="repliesContainer">
          <NewReply
            post={post}
            resetReplies={resetReplies}
            replyDelta={replyDelta}
            username={username}
            userID={userID}
            userPicture={userPicture}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Post;
