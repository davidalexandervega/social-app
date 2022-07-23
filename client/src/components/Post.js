import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import DeletePostPrompt from './DeletePostPrompt';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart, Cancel } from 'iconoir-react';

import { likePost } from '../features/post/postSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  let userID = '';
  if (user) {
    userID = jwt(user.access).user_id;
  }

  const time = new Date(post.time).toString().split('GMT')[0];

  const postRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      postRef.current.classList.add('fade', 'slide');
    }, 10);
    return () => clearTimeout(timer);
  }, []);

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

  const [deleteMode, setDeleteMode] = useState('off');

  return (
    <div className="post" ref={postRef}>
      <span className="postHeader">
        <span className="postUserPicture">
          <ProfileCircled height="2em" width="2em" strokeWidth="1" fill="whitesmoke" />
        </span>
        &nbsp;
        <span className="postUsername">@user</span>
        &nbsp;
        <span className="postTime">{time}</span>
      </span>
      <div className="postBody">{post.body}</div>
      <div className="postActions">
        <span className="postLike" onClick={() => onLikePost(post)}>
          <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
          &nbsp;{post.likes.length + isLiked.placeholder}
        </span>
        {post.user === userID ? (
          <span className="postDelete" onClick={() => setDeleteMode('on')}>
            <Cancel className="postDeleteButton" strokeWidth="1.1" />
          </span>
        ) : (
          ''
        )}
      </div>
      {deleteMode === 'on' ? (
        <DeletePostPrompt post={post} postRef={postRef} setDeleteMode={setDeleteMode} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Post;
