import React from 'react';
import { useState } from 'react';

import '../assets/styles/NewPost.scss';
import { DoubleCheck } from 'iconoir-react';

const Post = ({ post }) => {
  const [formData, setFormData] = useState({
    newPostBody: '',
  });

  const { newPostBody } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="newPost">
      <textarea
        className="formControl"
        id="newPostBody"
        name="newPostBody"
        value={newPostBody}
        onChange={onChange}
        size="200"
        placeholder="talk about what's going on."
      />
      <span className="labelButton solidButton">
        post&nbsp;
        <DoubleCheck />
      </span>
    </div>
  );
};

export default Post;
