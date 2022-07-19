import React from 'react';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart } from 'iconoir-react';

const Post = ({ post }) => {
  return (
    <div className="post">
      <span className="postHeader">
        <span className="postUserPicture">
          <ProfileCircled height="2em" width="2em" strokeWidth="1.1" fill="whitesmoke" />
        </span>
        &nbsp;
        <span className="postUsername">@user</span>
        &nbsp;
        <span className="postTime">{post.time}</span>
      </span>
      <div className="postBody">{post.body}</div>
      <div className="postActions">
        <span className="postLike">
          <Heart className="postLikeButton" strokeWidth="1.1" />
          &nbsp;{post.likes.length}
        </span>
      </div>
    </div>
  );
};

export default Post;
