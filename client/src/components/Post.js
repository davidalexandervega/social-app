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
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const { expandedPost } = useSelector((state) => state.reply);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  const postRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      postRef.current.classList.add('fade');
    }, 10);
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
    if (post.likes.includes(user.id)) {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: -1,
      });
      postData = {
        ...post,
        likes: [...post.likes].filter((like) => like !== user.id),
      };
    } else {
      setIsLiked({
        color: 'rgb(212, 196, 240)',
        placeholder: 1,
      });
      postData = {
        ...post,
        likes: [...post.likes, user.id],
      };
      if (post.user !== user.id) {
        const notificationData = {
          id: uuidv4(),
          time: new Date(),
          creatorID: user.id,
          creatorUsername: username,
          creatorPictureID: user.pictureID,
          recipientID: post.user,
          type: 'like_post',
          object: post.id,
        };
        dispatch(createNotification(notificationData));
      }
    }

    dispatch(likePost(postData));
  };

  useEffect(() => {
    if (post.likes.includes(user.id)) {
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
  }, [post.likes, user.id]);

  const [deleteMode, setDeleteMode] = useState(false);

  const replyDelta = useRef(0);

  const [newReplyData, setNewReply] = useState({
    newReplyBody: '',
  });

  const onReplyPost = (postID) => {
    if (expandedPost === postID) {
      dispatch(resetReplies());
    } else {
      dispatch(resetReplies());
      dispatch(expandPost(postID));
    }
  };

  const repliesContainerRef = useRef();
  useEffect(() => {
    if (expandedPost === post.id) {
      setTimeout(() => {
        repliesContainerRef.current.style.overflow = 'visible';
        repliesContainerRef.current.classList.add('slide');
      }, 10);
    } else {
      setTimeout(() => {
        if (repliesContainerRef.current) {
          repliesContainerRef.current.style.overflow = 'hidden';
          repliesContainerRef.current.classList.remove('slide');
        }
      }, 10);
      setTimeout(() => {
        setNewReply((prevState) => ({
          ...prevState,
          newReplyBody: '',
        }));
      }, 100);
    }
  }, [expandedPost, post.id]);

  return (
    <div className="postContainer">
      <div className="post" ref={postRef}>
        <span className="postHeader">
          <span className="postUserPicture">
            {post.userPictureID ? (
              <AdvancedImage
                className="postUserImage"
                cldImg={cloudinary
                  .image(`/social-app/pictures/${post.user}`)
                  .setVersion(post.userPictureID)}
              />
            ) : (
              <ProfileCircled height="42px" width="42px" strokeWidth="1" fill="whitesmoke" />
            )}
          </span>
          <span className="postUsername" onClick={() => navigate(`/users/${post.username}`)}>
            @{post.username}
          </span>
          <span className="postTime">{displayTime()}</span>
        </span>
        <div className="postBody" onClick={() => onPostView(post.id)}>
          {post.image === true ? (
            <AdvancedImage
              cldImg={cloudinary.image(`/social-app/posts/${post.id}`)}
              className="feedImage"
            />
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
          {post.user === user.id ? (
            <span className="postDelete" onClick={() => setDeleteMode(true)}>
              <Cancel className="postDeleteButton" strokeWidth="1.1" />
            </span>
          ) : null}
        </div>
        {deleteMode === true ? (
          <DeletePostPrompt post={post} postRef={postRef} setDeleteMode={setDeleteMode} />
        ) : null}
      </div>
      <div className="repliesContainer" ref={repliesContainerRef}>
        <NewReply
          post={post}
          resetReplies={resetReplies}
          replyDelta={replyDelta}
          user={user}
          newReplyData={newReplyData}
          setNewReply={setNewReply}
        />
      </div>
    </div>
  );
};

export default Post;
