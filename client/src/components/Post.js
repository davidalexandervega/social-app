import React from 'react';

import '../assets/styles/Post.scss';
import { ProfileCircled, Heart } from 'iconoir-react';

const Post = ({ post }) => {
  return (
    <div className="post">
      <span className="postHeader">
        <span className="postUserPicture">
          <ProfileCircled />
        </span>
        <span className="postUsername">@user</span>
        <span className="postTime">{post.time}</span>
      </span>
      <div className="postBody">{post.body}</div>
      <div className="postActions">
        <span className="postLike">
          <Heart />
        </span>
      </div>
    </div>
  );
};

export default Post;
