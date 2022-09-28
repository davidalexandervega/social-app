import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import DeletePostPrompt from '../components/DeletePostPrompt';
import NewReply from '../components/NewReply';
import Reply from '../components/Reply';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart, Cancel, ChatBubbleEmpty } from 'iconoir-react';
import { BallTriangle } from 'react-loading-icons';

import { fetchPostById, likePost, reset as resetPosts } from '../features/post/postSlice';
import { fetchReplies, reset as resetReplies } from '../features/reply/replySlice';
import { fetchNotifications } from '../features/notification/notificationSlice';
import { createNotification } from '../features/notification/notificationSlice';

const PostView = () => {
  const { postID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const { posts } = useSelector((state) => state.post);
  const post = posts[0];
  const { replies } = useSelector((state) => state.reply);
  const postLoaded = useSelector((state) => state.post.isSuccess);
  const repliesLoaded = useSelector((state) => state.reply.isSuccess);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(resetReplies());

    dispatch(fetchPostById(postID));
    dispatch(fetchReplies(postID));
    feedReplyDelta.current = 0;

    dispatch(fetchNotifications());
    return () => {
      dispatch(resetPosts());
      dispatch(resetReplies());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postRef = useRef();
  const postViewContainerRef = useRef();
  useEffect(() => {
    if (postLoaded && repliesLoaded) {
      postRef.current.classList.add('fade');
      setTimeout(() => {
        postViewContainerRef.current.classList.add('fade');
      }, 10);
    }
  }, [postLoaded, repliesLoaded]);

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
    if (post) {
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
    }
  }, [post, user.id]);

  const [deleteMode, setDeleteMode] = useState(false);

  const [newReplyData, setNewReply] = useState({
    newReplyBody: '',
  });

  const feedReplyDelta = useRef(location.state ? location.state.replyDelta.current : 0);
  const replyDelta = useRef(0);

  return (
    <div className="view">
      {postLoaded && repliesLoaded ? (
        <div className="postViewContainer" ref={postViewContainerRef}>
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
            <div className="postBody">
              {post.image === true ? (
                <AdvancedImage cldImg={cloudinary.image(`/social-app/posts/${post.id}`)} />
              ) : null}
              <div className="postText">{post.body}</div>
            </div>
            <div className="postActions">
              <span className="postLike" onClick={() => onLikePost(post)}>
                <Heart className="button postLikeButton" strokeWidth="1.1" fill={isLiked.color} />
                &nbsp;{post.likes.length + isLiked.placeholder}
              </span>
              <span className="postReply">
                <ChatBubbleEmpty className="button postReplyButton" strokeWidth="1.1" />
                &nbsp;{post.replies.length + feedReplyDelta.current + replyDelta.current}
              </span>
              {post.user === user.id ? (
                <span className="postDelete" onClick={() => setDeleteMode(true)}>
                  <Cancel className="postDeleteButton" strokeWidth="1.1" />
                </span>
              ) : null}
            </div>
            {deleteMode === true ? (
              <DeletePostPrompt
                post={post}
                postRef={postRef}
                setDeleteMode={setDeleteMode}
                postView={true}
                postViewContainerRef={postViewContainerRef}
              />
            ) : null}
          </div>
          <div className="postViewRepliesContainer">
            <NewReply
              post={post}
              resetReplies={resetReplies}
              replyDelta={replyDelta}
              postView={true}
              user={user}
              newReplyData={newReplyData}
              setNewReply={setNewReply}
            />
            {replies.map((reply) => (
              <Reply key={reply.id} reply={reply} replyDelta={replyDelta} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <span className="loadingContainer">
          <BallTriangle className="loadingIcon" stroke="#000000" strokeOpacity="0.7" height="2em" />
        </span>
      )}
    </div>
  );
};

export default PostView;
