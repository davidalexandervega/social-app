import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import DeletePostPrompt from '../components/DeletePostPrompt';
import NewReply from '../components/NewReply';
import Reply from '../components/Reply';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart, Cancel, ChatBubbleEmpty } from 'iconoir-react';

import { likePost } from '../features/post/postSlice';
import { fetchReplies, expandPost, reset as resetReplies } from '../features/reply/replySlice';

const PostView = () => {
  const { id } = useParams();
  const { posts } = useSelector((state) => state.post);
  const post = posts.find((post) => post.id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { replies, expandedPost } = useSelector((state) => state.reply);

  let userID = '';
  if (user) {
    userID = jwt(user.access).user_id;
  }

  useEffect(() => {
    dispatch(resetReplies());
    dispatch(fetchReplies(id));
    dispatch(expandPost(id));
    return () => {
      dispatch(expandPost(null));
    };
  }, [dispatch, id]);

  const postRef = useRef();
  useEffect(() => {
    postRef.current.classList.add('fade', 'slide');
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

  const [deleteMode, setDeleteMode] = useState(false);

  const replyDelta = useRef(0);

  return (
    <div className="feedPage">
      <div className="postContainer">
        <div className="post" ref={postRef}>
          <span className="postHeader">
            <span className="postUserPicture">
              <ProfileCircled height="2em" width="2em" strokeWidth="1" fill="whitesmoke" />
            </span>
            &nbsp;
            <span className="postUsername">@user</span>
            &nbsp;
            <span className="postTime">{displayTime()}</span>
          </span>
          <div className="postBody" onClick={() => navigate(`/posts/${post.id}`)}>
            {post.body}
          </div>
          <div className="postActions">
            <span className="postLike" onClick={() => onLikePost(post)}>
              <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
              &nbsp;{post.likes.length + isLiked.placeholder}
            </span>
            <span className="postReply">
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
            <DeletePostPrompt
              post={post}
              postRef={postRef}
              setDeleteMode={setDeleteMode}
              postView={true}
            />
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
              postView={true}
            />
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} replyDelta={replyDelta} />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default PostView;
