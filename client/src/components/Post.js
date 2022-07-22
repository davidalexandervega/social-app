import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart } from 'iconoir-react';

import { likePost } from '../features/post/postSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userID = jwt(user.access).user_id;

  const onLikePost = (post) => {
    if (post.likes.includes(userID)) {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: -1,
      });
    } else {
      setIsLiked({
        color: 'pink',
        placeholder: 1,
      });
    }
    dispatch(likePost(post));
  };

  const [isLiked, setIsLiked] = useState({
    color: 'whitesmoke',
    placeholder: 0,
  });

  useEffect(() => {
    if (post.likes.includes(userID)) {
      setIsLiked({
        color: 'pink',
        placeholder: 0,
      });
    } else {
      setIsLiked({
        color: 'whitesmoke',
        placeholder: 0,
      });
    }
  }, [post.likes, userID]);

  return (
    <div className="post">
      <span className="postHeader">
        <span className="postUserPicture">
          <ProfileCircled height="2em" width="2em" strokeWidth="1" fill="whitesmoke" />
        </span>
        &nbsp;
        <span className="postUsername">@user</span>
        &nbsp;
        <span className="postTime">{post.time}</span>
      </span>
      <div className="postBody">{post.body}</div>
      <div className="postActions">
        <span className="postLike" onClick={() => onLikePost(post)}>
          <Heart className="postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
          &nbsp;{post.likes.length + isLiked.placeholder}
        </span>
      </div>
    </div>
  );
};

export default Post;
